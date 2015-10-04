/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var KEY = "Put your api key here";

var spots = {
  "Lyall Bay" :  "-41.3284420,174.7972330",
  "Titahi Bay" : "-41.1061560,174.8386830",
  "CastlePoint" : "-40.908919,176.222706"
};

var UI = require('ui');
var ajax = require('ajax');


var card = new UI.Card({
  title:'Surf Forecast',
  subtitle:'Fetching...'
});


var getMainMenu = function(){
  var menuItems = [];

  for(var key in spots){
    menuItems.push({
      title : key
    });  
  }
  
  var mainMenu = new UI.Menu({
    sections : [{
      title : 'Get Forecast',
      items : menuItems
    }]
  });
  return mainMenu;
};

var mainMenu = getMainMenu();


var doAjax = function(spotName){
  var latlon = spots[spotName];
  
  var URL = 'http://api.worldweatheronline.com/free/v2/marine.ashx?q=' + latlon + "&key=" +KEY + "&format=json";
  
  card.show();
  mainMenu.hide();
  
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(response) {
      // Success!
      console.log('Successfully fetched surf data!');

      // at the moment we only get the swell details for the time right now
      var firstHour = response.data.weather[0].hourly[0];

      var height = firstHour.sigHeight_m;
      var period = firstHour.swellPeriod_secs;
      var winddir = firstHour.winddir16Point;

      card.subtitle(spotName + ', ');
      card.body("height : " + height + "m.\nperiod : " + period + " secs\nwind : " + winddir);


    },
    function(error) {
      // Failure!
      console.log('Failed fetching surf data: ' + error);
    }
  );
};

mainMenu.on('select', function(e){
  doAjax(e.item.title);
});

card.on('click', function(e){
  mainMenu.show();
  card.hide();
  card.subtitle('Fetching...');
  card.body('');
});

// start of app
mainMenu.show();



