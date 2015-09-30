/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Surf Forecast',
  subtitle:'Fetching...'
});

// Display the Card
card.show();


var lyall = "-41.3284420,174.7972330";
var KEY = "Put your api key here";
var URL = 'http://api.worldweatheronline.com/free/v2/marine.ashx?q=' + lyall + "&key=" +KEY + "&format=json";


//Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(response) {
    // Success!
    console.log('Successfully fetched surf data!');
    
    var firstHour = response.data.weather[0].hourly[0];
    
    var height = firstHour.sigHeight_m;
    var period = firstHour.swellPeriod_secs;
    var location = "Lyall Bay";
    
    card.subtitle(location + ', ');
    card.body("height : " + height + "m.\n period : " + period + " secs");
  },
  function(error) {
    // Failure!
    console.log('Failed fetching surf data: ' + error);
  }
);


