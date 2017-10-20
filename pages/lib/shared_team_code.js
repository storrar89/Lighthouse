const $ = require('jquery');
const LighthouseJson = require('./shared_json_code.js');

function GetTaskingfromBeacon(Id, host, token, callback) {
  console.log("GetTaskingfromBeacon called with:" + Id+", "+host);

    LighthouseJson.get_json(
    host+"/Api/v1/Tasking/Search?TeamIds=" + Id, token,
    function(res){
      console.log("Progress CB");
    },
    function(results) { //call for the JSON, rebuild the array and return it when done.
      console.log("GetJSONfromBeacon call back");
      var obj = {
        "Results": results
      };
      callback(obj);
    }
  );

}

//make the call to beacon
function GetJSONTeamsfromBeacon(unit, host, StartDate, EndDate, token, callback, statusTypes = []) {
  console.debug("GetJSONTeamsfromBeacon called with:" + unit + "," + host+", "+StartDate + "," + EndDate);
  let params = {};
  params['StatusStartDate'] = StartDate.toISOString();
  params['StatusEndDate'] = EndDate.toISOString();
  params['SortField'] = 'CreatedOn';
  params['SortOrder'] = 'desc';
  params['StatusTypeId'] = statusTypes;

  if (unit !== null || typeof unit == undefined) {
    if (Array.isArray(unit) == false) {
      params['AssignedToId'] = unit.Id;
      params['CreatedAtId'] = unit.Id;
    } else {
      let assignedToId = [];
      let createdAtId = [];

      unit.forEach(function(d){
        assignedToId.push(d.Id);
        createdAtId.push(d.Id);
      });

      params['AssignedToId'] = assignedToId;
      params['CreatedAtId'] = createdAtId;
    }
  }

  var url = host+"/Api/v1/Teams/Search?" + $.param(params, true);
    
  LighthouseJson.get_json(
    url, token,
    function(res){
      console.debug("Progress CB");
    },
    function(results) { //call for the JSON, rebuild the array and return it when done.
      console.debug("GetJSONfromBeacon call back");
      var obj = {
        "Results": results
      };
      callback(obj);
    }
  );

}

/**
 * Gets team positions as GeoJson based off the last tasking update.
 *
 * @param hqs the units to filter on.
 * @param startDate the date to limit the tasking search from.
 * @param endDate the date to limit the tasking search till.
 * @param token the authorisation token.
 * @param callback the callback to send the data to after it is fetched.
 */
function getTeamGeoJson(hqs, host, startDate, endDate, token, callback) {
    console.debug('fetching SES teams geoJson');

    let lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);

    // Grab teams from the last year
    let teamStartRange = new Date();
    teamStartRange.setFullYear(teamStartRange.getFullYear() - 1);
    let teamEndRange = new Date();
    let statusTypes = [3]; // Only get activated teams

    GetJSONTeamsfromBeacon(hqs, host, teamStartRange, teamEndRange, token, function (teams) {

        // Make a promise to collect all the team details in promises
        new Promise((mainResolve) => {
            let promises = [];

            teams.Results.forEach(function (team) {

                // Create a promise for this team to check its tasking and details
                promises.push(new Promise((resolve) => {
                    GetTaskingfromBeacon(team.Id, host, token, function (teamTasking) {
                        let latestTasking = null;
                        let latestTime = null;
                        let taskingList = [];

                        // Find the latest tasking
                        teamTasking.Results.forEach(function (task) {
                            let rawStatusTime = new Date(task.CurrentStatusTime);
                            let taskTime = new Date(rawStatusTime.getTime());

                            if (startDate != null && endDate != null) { //not null when viewing a date range, so all jobs are in play
                                if (taskTime < startDate || taskTime > endDate) {
                                    // Filter any tasking outside the start / end date range
                                    return;
                                }
                            } else {
                                //viewing "current" which means finalised are hidden
                                if (task.Job.JobStatusType.Name === "Complete" ||
                                    task.Job.JobStatusType.Name === "Finalised" ||
                                    task.Job.JobStatusType.Name === "Cancelled" ||
                                    task.Job.JobStatusType.Name === "Rejected") {
                                    return;
                                }
                            }

                            // it wasn't an un-task or a tasking (so its a action the team made like on route or onsite)
                            if (latestTime < taskTime && task.CurrentStatus !== "Tasked" && task.CurrentStatus !== "Untasked") {
                                if (latestTasking) {
                                    taskingList.push(latestTasking);
                                }
                                latestTasking = task;
                                latestTime = taskTime;
                            } else {
                                taskingList.push(task);
                            }
                        });

                        let features = [];

                        // If valid tasking was found, add that into a geoJson feature
                        if (latestTasking !== null) {
                            let feature = taskToGeoJson(latestTasking, 'latest-update');
                            features.push(feature);
                        }

                        taskingList.forEach(task => features.push(taskToGeoJson(task)));

                        resolve(features);
                    });
                }));
            });

            console.debug(`Found ${promises.length} teams to query tasking for`);
            mainResolve(promises);

        }).then((promises) => {

            // Wait for all the team tasking promises to complete
            Promise.all(promises).then(function (featureLists) {

                let geoJson = {
                    'type': 'FeatureCollection',
                    'features': []
                };

                // Collect all non-null features
                featureLists.forEach(function (features) {
                    if (features) {
                        geoJson.features = geoJson.features.concat(features);
                    }
                });

                console.debug('Found ' + geoJson.features.length + ' teams');
                callback(geoJson);

            }, function (error) {
                callback(error);
            });
        });
    }, statusTypes);
}

/**
 * Converts team tasking to a geoJson point.
 *
 * @param task the task to convert.
 * @param featureType the type of feature, e.g. 'pending', 'latest-update'.
 * @returns a point.
 */
function taskToGeoJson(task, featureType = 'pending') {
    let feature = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [
                task.Job.Address.Longitude,
                task.Job.Address.Latitude
            ]
        },
        'properties': {
            'teamId': task.Team.Id,
            'teamCallsign': task.Team.Callsign,
            'onsite': task.Onsite,
            'offsite': task.Offsite,
            'currentStatusTime': task.CurrentStatusTime,
            'jobId': task.Job.Id,
            'featureType': featureType
        }
    };

    if (task.PrimaryTaskType) {
        feature.properties.primaryTask = task.PrimaryTaskType.Name;
    }

    return feature;
}

module.exports = {
  get_tasking: GetTaskingfromBeacon,
  get_teams: GetJSONTeamsfromBeacon,
  getTeamGeoJson: getTeamGeoJson
};

