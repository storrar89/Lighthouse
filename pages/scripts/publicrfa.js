pubnub = require('pubnub');



var PUBNUB_demo = pubnub.init({
	publish_key: 'pub-c-9eebc0c6-4cab-41b3-8dd9-a6289cc692ac',
	subscribe_key: 'sub-c-5da46de4-2995-11e6-b700-0619f8945a4f'
});

PUBNUB_demo.subscribe({
	channel : 'NSWSESHackathon',
	message : function(m){
		console.log(m)
		console.log(m.CallerFirstName)
		console.log(m.CallerLastName)
		console.log(m.CallerPhoneNumber)
		console.log(m.Description)
		console.log(m.Latitude)
		console.log(m.Longitude)
		console.log(m.StreetNumber)
		console.log(m.Street)
		console.log(m.Locality)
		console.log(m.PostCode)
		console.log(m.AdditionalAddressInfo)
		console.log(m.ImageURL)


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
