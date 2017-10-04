window.FinaliseSelected = function FinaliseSelected(words,beaconStringDate) { // Never ever use the following function for any purpose.
  if( !confirm( "WARNING - Never ever use the following function for any purpose!\nAre you absolutely sure you want to proceed?" ) ){
    return false;
  }
  console.log("Man will someone be cranky with you!");
  contentViewModel.selectedJobs.peek().forEach(function(d){
    contentViewModel.JobManager.FinaliseJob(d,words,beaconStringDate,(function(d){console.log("OK")}),(function(d){console.log("Fail")}),(function(d){console.log("always")}));
  });
}


$("#lighthouseSummaryButton").mouseenter(function(ev){
  summary();
});

document.getElementById("lighthouseSummaryButton").onclick = function() {
  summary();
}


function summary() {
  var exports = JSON.parse(filterDataForExport());
  if (exports.hasOwnProperty("Hq")) {
    $("#lighthouseSummaryButton").attr("href",lighthouseUrl+"pages/summary.html?host="+urls.Base+"&hq="+exports.Hq+"&start="+encodeURIComponent(exports.StartDate)+"&end="+encodeURIComponent(exports.EndDate)+ "&token=" + encodeURIComponent(user.accessToken));
  } else {
    $("#lighthouseSummaryButton").attr("href",lighthouseUrl+"pages/summary.html?host="+urls.Base+"&start="+encodeURIComponent(exports.StartDate)+"&end="+encodeURIComponent(exports.EndDate)+ "&token=" + encodeURIComponent(user.accessToken));
  }
}

$("#lighthouseStatsButton").mouseenter(function(ev){
  stats();
});

document.getElementById("lighthouseStatsButton").onclick = function() {
  stats();
}


function stats(){
  var exports = JSON.parse(filterDataForExport());
  if (exports.hasOwnProperty("Hq")){
    $("#lighthouseStatsButton").attr("href",lighthouseUrl+"pages/stats.html?host="+urls.Base+"&hq="+exports.Hq+"&start="+encodeURIComponent(exports.StartDate)+"&end="+encodeURIComponent(exports.EndDate)+ "&token=" + encodeURIComponent(user.accessToken));
  } else {
    $("#lighthouseStatsButton").attr("href",lighthouseUrl+"pages/stats.html?host="+urls.Base+"&start="+encodeURIComponent(exports.StartDate)+"&end="+encodeURIComponent(exports.EndDate)+ "&token=" + encodeURIComponent(user.accessToken));
  }
}


$("#lighthouseExportButton").mouseenter(function(ev){
  advexport();
});

document.getElementById("lighthouseExportButton").onclick = function() {
  summary();
}


function advexport() {
  var exports = JSON.parse(filterDataForExport());
  if (exports.hasOwnProperty("Hq")){
    $("#lighthouseExportButton").attr("href",lighthouseUrl+"pages/advexport.html?host="+urls.Base+"&hq="+exports.Hq+"&start="+encodeURIComponent(exports.StartDate)+"&end="+encodeURIComponent(exports.EndDate)+ "&token=" + encodeURIComponent(user.accessToken));
  } else {
    $("#lighthouseExportButton").attr("href",lighthouseUrl+"pages/advexport.html?host="+urls.Base+"&start="+encodeURIComponent(exports.StartDate)+"&end="+encodeURIComponent(exports.EndDate)+ "&token=" + encodeURIComponent(user.accessToken));
  }
}


//More pageination choices! --currently broken due to beacon not returning more than 250 per page--
// contentViewModel.pageSizeChoices.push(200);
// contentViewModel.pageSizeChoices.push(500);
// contentViewModel.pageSizeChoices.push(1000);

// var saved = utility.getPrimitiveFromLocalStorage(contentViewModel.localStorageKeys.PageSize);
// var selected = contentViewModel.selectedPageSizeChoice.peek();

// console.log("saved:"+saved);
// console.log("selected:"+selected);
// if( saved != selected ){
//   console.log("Fixing page size difference");
//   contentViewModel.selectedPageSizeChoice(saved);
// }

var query = window.location.search.substring(1);
var qs = parse_query_string(query);
var filterApplied = false

$.each( qs, function( key, value ) {  
  switch (key)
  {
    case "Tags":
    filterApplied = true
    filterViewModel.selectedTags.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedTags.push({Id:itm})
    })
    break
    case "RescueTypes":
    filterApplied = true
    filterViewModel.selectedRescueTypes.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedRescueTypes.push({Id:itm})
    })
    break
    case "FloodAssTypes":
    filterApplied = true
    filterViewModel.selectedFloodAssTypes.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedFloodAssTypes.push({Id:itm})
    })
    break
    case "PriorityTypes":
    filterApplied = true
    filterViewModel.selectedPriorityTypes.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedPriorityTypes.push({Id:itm})
    })
    break
    case "StatusTypes":
    filterApplied = true
    filterViewModel.selectedStatusTypes.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedStatusTypes.push({Id:itm})
    })
    break
    case "ParentJobTypes":
    filterApplied = true
    filterViewModel.selectedParentJobTypes.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedParentJobTypes.push({Id:itm})
    })
    break
    case "dateRangeType":
    filterApplied = true
    switch (value)
    {
      case "Today":
      filterViewModel.startDate(utility.dateRanges.Today.StartDate())
      filterViewModel.endDate(utility.dateRanges.Today.EndDate())
      filterViewModel.dateRangeType('Today')
      $("#reportrange").data().daterangepicker.startDate = utility.dateRanges.Today.StartDate()
      $("#reportrange").data().daterangepicker.endDate = utility.dateRanges.Today.EndDate()
      $("#reportrange span").html(utility.dateRanges.Today.StartDate().format("MMMM D, YYYY H:mm") + " - " + utility.dateRanges.Today.EndDate().format("MMMM D, YYYY H:mm"));
      break
      case "Yesterday":
      filterViewModel.startDate(utility.dateRanges.Yesterday.StartDate())
      filterViewModel.endDate(utility.dateRanges.Yesterday.EndDate())
      filterViewModel.dateRangeType('Yesterday')
      $("#reportrange").data().daterangepicker.startDate = utility.dateRanges.Yesterday.StartDate()
      $("#reportrange").data().daterangepicker.endDate = utility.dateRanges.Yesterday.EndDate()
      $("#reportrange span").html(utility.dateRanges.Yesterday.StartDate().format("MMMM D, YYYY H:mm") + " - " + utility.dateRanges.Yesterday.EndDate().format("MMMM D, YYYY H:mm"));
      break
      case "Last 7 Days":
      filterViewModel.startDate(utility.dateRanges.Last7Days.StartDate())
      filterViewModel.endDate(utility.dateRanges.Last7Days.EndDate())
      filterViewModel.dateRangeType('Last 7 Days')
      $("#reportrange").data().daterangepicker.startDate = utility.dateRanges.Last7Days.StartDate()
      $("#reportrange").data().daterangepicker.endDate = utility.dateRanges.Last7Days.EndDate()
      $("#reportrange span").html(utility.dateRanges.Last7Days.StartDate().format("MMMM D, YYYY H:mm") + " - " + utility.dateRanges.Last7Days.EndDate().format("MMMM D, YYYY H:mm"));
      break
      case "Last 30 Days":
      filterViewModel.startDate(utility.dateRanges.Last30Days.StartDate())
      filterViewModel.endDate(utility.dateRanges.Last30Days.EndDate())
      filterViewModel.dateRangeType('Last 30 Days')
      $("#reportrange").data().daterangepicker.startDate = utility.dateRanges.Last30Days.StartDate()
      $("#reportrange").data().daterangepicker.endDate = utility.dateRanges.Last30Days.EndDate()
      $("#reportrange span").html(utility.dateRanges.Last30Days.StartDate().format("MMMM D, YYYY H:mm") + " - " + utility.dateRanges.Last30Days.EndDate().format("MMMM D, YYYY H:mm"));
      break
      case "This Month":
      filterViewModel.startDate(utility.dateRanges.ThisMonth.StartDate())
      filterViewModel.endDate(utility.dateRanges.ThisMonth.EndDate())
      filterViewModel.dateRangeType('This Month')
      $("#reportrange").data().daterangepicker.startDate = utility.dateRanges.ThisMonth.StartDate()
      $("#reportrange").data().daterangepicker.endDate = utility.dateRanges.ThisMonth.EndDate()
      $("#reportrange span").html(utility.dateRanges.ThisMonth.StartDate().format("MMMM D, YYYY H:mm") + " - " + utility.dateRanges.ThisMonth.EndDate().format("MMMM D, YYYY H:mm"));
      break
      case "Last Month":
      filterViewModel.startDate(utility.dateRanges.LastMonth.StartDate())
      filterViewModel.endDate(utility.dateRanges.LastMonth.EndDate())
      filterViewModel.dateRangeType('Last Month')
      $("#reportrange").data().daterangepicker.startDate = utility.dateRanges.LastMonth.StartDate()
      $("#reportrange").data().daterangepicker.endDate = utility.dateRanges.LastMonth.EndDate()
      $("#reportrange span").html(utility.dateRanges.LastMonth.StartDate().format("MMMM D, YYYY H:mm") + " - " + utility.dateRanges.LastMonth.EndDate().format("MMMM D, YYYY H:mm"));
      break
      case "This Calendar Year":
      filterViewModel.startDate(moment().startOf('year'))
      filterViewModel.endDate(moment().endOf('year'))
      filterViewModel.dateRangeType('This Calendar Year')
      $("#reportrange").data().daterangepicker.startDate = moment().startOf('year')
      $("#reportrange").data().daterangepicker.endDate = moment().endOf('year')
      $("#reportrange span").html(moment().startOf('year').format("MMMM D, YYYY H:mm") + " - " + moment().endOf('year').format("MMMM D, YYYY H:mm"));
      break
      case "All":
      filterViewModel.startDate(utility.minDate)
      filterViewModel.endDate(moment().endOf('year'))
      filterViewModel.dateRangeType('All')
      $("#reportrange").data().daterangepicker.startDate = utility.minDate
      $("#reportrange").data().daterangepicker.endDate = moment().endOf('year')
      $("#reportrange span").html(utility.minDate.format("MMMM D, YYYY H:mm") + " - " + moment().endOf('year').format("MMMM D, YYYY H:mm"));
      break
      case "Custom Range":
      var start = moment(qs.startDate)
      var end = moment(qs.endDate)
      filterViewModel.startDate(start)
      filterViewModel.endDate(end)
      filterViewModel.dateRangeType('Custom Range')
      $("#reportrange").data().daterangepicker.startDate = start
      $("#reportrange").data().daterangepicker.endDate = end
      $("#reportrange span").html(start.format("MMMM D, YYYY H:mm") + " - " + end.format("MMMM D, YYYY H:mm"));
      break
    }
    break
    case "Events":
    filterApplied = true
    filterViewModel.selectedEvents.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedEvents.push({Id:itm})
    })
    break
    case "IInIds":
    filterApplied = true
    filterViewModel.icemsIInIds.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      $.ajax({
        type: 'GET',
        url: urls.Base+'/Api/v1/Jobs/Search?ICEMSIncidentIdentifier=' + itm + '&PageSize=1',
        beforeSend: function(n) {
          n.setRequestHeader("Authorization", "Bearer " + user.accessToken)
        },
        data: {
          LighthouseFunction: 'LighthouseLoadICEMSFromURL'
        },
        cache: false,
        dataType: 'json',
        complete: function(response, textStatus) {
          if (textStatus == 'success') {
            if (response.responseJSON.Results.length)
            {
              filterViewModel.icemsIInIds.push(response.responseJSON.Results[0])
            }
          }
        }
      })
    })
    break
    case "Teams":
    filterApplied = true
    filterViewModel.selectedTeams.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      whenBaseIsReady(function() {

        $.ajax({
          type: 'GET',
          url: urls.Base+'/Api/v1/Teams/' + itm + '?viewModelType=3',
          beforeSend: function(n) {
            n.setRequestHeader("Authorization", "Bearer " + user.accessToken)
          },
          data: {
            LighthouseFunction: 'LighthouseLoadTeamsFromURL'
          },
          cache: false,
          dataType: 'json',
          complete: function(response, textStatus) {
            if (textStatus == 'success') {
              if (response.responseJSON)
              {
                filterViewModel.selectedTeams.push({Id:response.responseJSON.Id,Callsign:response.responseJSON.Callsign})
              }
            }
          }
        })
      })
    })    
    break
    case "Entities":
    filterApplied = true
    filterViewModel.selectedEntities.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedEntities.push({Id:itm})
    })
    break
    case "People":
    filterApplied = true
    filterViewModel.selectedPeople.removeAll()
    var ids = JSON.parse(value);
    ids.forEach(function(itm) {
      filterViewModel.selectedPeople.push({Id:itm})
    })
    break
  }
  console.log(key)
  console.log(value)
})

if (filterApplied)
{
  filterViewModel.updateFilters();
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}

// wait for address to have loaded
function whenBaseIsReady(cb) { //when external vars have loaded
  var waiting = setInterval(function() { //run every 1sec until we have loaded the page (dont hate me Sam)
    if (typeof urls != "undefined" )
    {
      if (typeof urls.Base !== "undefined") {
        console.log(urls.Base)
        console.log("base is ready");
      clearInterval(waiting); //stop timer
      cb(); //call back
    }
  }
}, 200);
}

DoTour()

function DoTour() {
  require('bootstrap-tour')

    // Instance the tour
    var tour = new Tour({
      name: "LHTourJobs",
      smartPlacement: true,
      placement: "right",
      steps: [
      {
        element: "",
        placement: "top",
        orphan: true,
        backdrop: true,
        title: "Lighthouse Welcome",
        content: "Lighthouse has made some changes to this page. would you like a tour?"
      },
      {
        element: "#lighthouseSummaryButton",
        title: "Lighthouse Summary",
        placement: "bottom",
        backdrop: false,
        content: "Lighthouse Summary provides a simple to read screen that gives a summary of all jobs. It will only follow Headquarter and Date filters.",
      },
      {
        element: "#lighthouseStatsButton",
        title: "Lighthouse Statistics",
        placement: "bottom",
        backdrop: false,
        content: "Lighthouse Statistics provides a simple statistics (pie charts and bar graphs) breakdown for all jobs. It will only follow Headquarter and Date filters.",
      },
      {
        element: "#lighthouseExportButton",
        title: "Lighthouse Export",
        placement: "bottom",
        backdrop: false,
        onNext: function (tour) {
          $('#lhquickfilter > ul').show();
        },
        content: "Lighthouse Advanced Export allows you to export jobs and includes almost all the available data for the job - 31 data fields in total.",
      },
      {
        element: "#lhquickfilter",
        title: "Lighthouse Quickfilters",
        placement: "right",
        backdrop: false,
        onNext: function (tour) {
          $('#lhquickfilter > ul').hide();
        },
        content: "Lighthouse adds a new filter menu that groups together common filters.eg 'Rescue Jobs' covers RCR, Flood, and VR.",
      },
      {
        element: "",
        placement: "top",
        orphan: true,
        backdrop: true,
        title: "Questions?",
        content: "Thats about it. If you have any questions please seek help from the 'About Lighthout' button under the lighthouse menu on the top menu"
      },
      ]
    })

    /// Initialize the tour
    tour.init();

// Start the tour
tour.start();
}


