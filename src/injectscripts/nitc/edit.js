var $ = require('jquery');
var csv = require("javascript-csv");

$("#importbutton").click(function() {
  console.log($("#csv").val())

  var input = csv.toArrays($("#csv").val());
  input.forEach(function(v){
    console.log(v)
    getMemberDbId(v[0],function(id){
      var participant = {}
      participant.Id = id.PersonId
      participant.LastName = id.Lastname
      participant.FirstName = id.Firstname
      console.log(participant)
      vm.addParticipant(participant)
      vm.participants.peek()[vm.participants.peek().length-1].partialAttendance(true)
      vm.participants.peek()[vm.participants.peek().length-1].startDate(new Date(v[1]))
      //vm.participants.peek()[vm.participants.peek().length-1].endDate(new Date(v[2]))

    })
  })
});


function getMemberDbId(membernumber,cb){

  $.ajax({
    type: 'GET'
    , url: urls.Base+'/Api/v1/Users/Search?'+"Username="+membernumber
    , beforeSend: function(n) {
      n.setRequestHeader("Authorization", "Bearer " + user.accessToken)
    }
    , cache: false
    , dataType: 'json'
    , complete: function(response, textStatus) {
      if(textStatus == 'success')
      {
        if (response.responseJSON.Results.length == 1)
        {
          console.log("getMemberDbId CB with ")
          console.log(response.responseJSON.Results[0])
          cb(response.responseJSON.Results[0])
        } else {
          cb(null)
        }        }

      }
    })
}

