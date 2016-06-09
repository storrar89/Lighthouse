pubnub = require('pubnub');
var $ = require('jquery');
var DOM = require('jsx-dom-factory');
global.jQuery = $;
require('../styles/publicsubmissions.css');




var PUBNUB_demo = pubnub.init({
	publish_key: 'pub-c-9eebc0c6-4cab-41b3-8dd9-a6289cc692ac',
	subscribe_key: 'sub-c-5da46de4-2995-11e6-b700-0619f8945a4f'
});

PUBNUB_demo.subscribe({
	channel : 'NSWSESHackathon',
	message : function(m){
		console.log(m)


		var $html = make_public_submission(
			m.job.CallerFirstName+" "+m.job.CallerLastName,
			{
				'Name': m.job.CallerFirstName+" "+m.job.CallerLastName,
				'Address': m.job.StreetNumber+" "+m.job.Street+" "+m.job.Locality+" "+m.job.PostCode,
				'AddressAdditional': m.job.AdditionalAddressInfo,
				'Contact': m.job.CallerPhoneNumber
			},
			m.job.Description
			)

		$($html).find('button').click(function() {
			console.log(m.id);
			localStorage.setItem('testObject', JSON.stringify(m));
			window.open('https://trainbeacon.ses.nsw.gov.au/Jobs/Create','_blank'); 
		});
		$($html).appendTo('#content');
	},
	error : function (error) {
        // Handle error here
        console.log(JSON.stringify(error));
    }
});


PUBNUB_demo.time(
	function(time){
		console.log(time)
	}
	);



PUBNUB_demo.here_now({
	channel : 'NSWSESHackathon',
	callback : function(m){
		console.log(m)
	}
});




function make_public_submission(name, dataz, text) {
	return (
		<div class="panel panel-default" style="margin-top:10px">
		<div class="panel-heading">
		<h3 class="panel-title">RFA Submission from {name}</h3>
		</div>
		<div class="panel-body">
		<div class="row">
		<div class="col-md-8">
		<table class="table table-bordered">
		<tbody>
		<tr>
		<td>Name:</td>
		<td>{dataz.Name}</td>
		</tr>
		<tr>
		<td>Address:</td>
		<td>address</td>
		</tr>
		<tr>
		<td>Additional Address:</td>
		<td>more</td>
		</tr>
		<tr>
		<td>Contact:</td>
		<td>{dataz.Contact}</td>
		</tr>
		</tbody>
		</table>
		{text}
		</div>
		<div class="col-md-4">
		<div class="well pull-right" style="width:250px;height:250px;"><img width="200px" height="200px" src="http://stockfresh.com/files/z/zsooofija/m/61/5154942_stock-vector-kids-drawing-of-a-house-rainbow-and-tree.jpg"/></div>
		</div>
		</div>
		<div class="row">
		</div>
		</div>
		<div class="panel-footer text-right">
		<div class="btn-toolbar">
		<button type="button" class="btn btn-danger">Reject</button> 
		<button type="button" class="btn btn-success">Accept</button> 
		<button type="button" class="btn btn-primary">Request Further Info</button>
		</div>
		</div>
		</div>
		);
}


