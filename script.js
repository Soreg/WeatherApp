$(document).ready(function() {
  let lat;
  let long;

// Add skycons
var skycons = new Skycons({"color": "white"});

  $.getJSON('http://ip-api.com/json', function(data2) {
    lat = data2.lat;
    long = data2.lon;
    let country = data2.country;
    let city = data2.city;
    // Get weather api
    $.ajax({
               type: 'GET',
               url: 'https://crossorigin.me/https://api.darksky.net/forecast/b1771da80a45a69cc2fcaf3cdbe9ab1a/' + lat + ',' + long + '?&units=auto',
               processData: true,
               data: {},
               dataType: "json",
               success: function (data) {
                   processData(data);
               }
    });
    // Get weather data through JSON
    function processData(data){

      // Assign data
      let timezone = data.timezone;
      let currentWeather = data.currently.summary;
      let temp = data.currently.temperature;
      let tempCalc = temp;
      let weatherType = data.currently.icon;
      (data.flags.units === 'si') ? tempState = 1 : tempState = 2;
      (tempState === 1) ? temp = temp + "101"+String.fromCharCode(176) +"C" : temp = temp + "101"+String.fromCharCode(176) +"F" ;

      $('#degree').click(function() {
        if(tempState === 1) {
          tempCalc = (tempCalc * 9 / 5 + 32);
          temp = tempCalc.toFixed(2) + "101"+String.fromCharCode(176) +"F";
          $('#degree').html(temp);
          tempState = 2;
        } else {
          tempCalc = ((5/9) * (tempCalc-32));
          temp = tempCalc.toFixed(2) + "101"+String.fromCharCode(176) +"C";
          $('#degree').html(temp);
          tempState = 1;
        }
      });

      $('#location').html('Current weather in: ' + city + ", " + country);
      $('#weatherType').html(currentWeather);
      $('#degree').html(temp);
      if(weatherType === 'partly-cloudy-day') {
        skycons.add('icon1', Skycons.PARTLY_CLOUDY_DAY);
      } else if(weatherType === 'clear-day') {
        skycons.add('icon1', Skycons.CLEAR_DAY);
      } else if(weatherType === 'clear-night') {
        skycons.add('icon1', Skycons.CLEAR_NIGHT);
      } else if(weatherType === 'rain') {
        skycons.add('icon1', Skycons.RAIN);
      } else if(weatherType === 'snow') {
        skycons.add('icon1', Skycons.SNOW);
      } else if(weatherType === 'sleet') {
        skycons.add('icon1', Skycons.SLEET);
      } else if(weatherType === 'wind') {
        skycons.add('icon1', Skycons.WIND);
      } else if(weatherType === 'fog') {
        skycons.add('icon1', Skycons.FOG);
      } else if(weatherType === 'cloudy') {
        skycons.add('icon1', Skycons.CLOUDY);
      } else if(weatherType === 'partly-cloudy-day') {
        skycons.add('icon1', Skycons.PARTLY_CLOUDY_DAY);
      } else if(weatherType === 'partly-cloudy-night') {
        skycons.add('icon1', Skycons.PARTLY_CLOUDY_NIGHT);
      }

skycons.play();
    };
  });

});
