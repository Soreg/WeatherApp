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
    var api = 'https://api.darksky.net/forecast/b1771da80a45a69cc2fcaf3cdbe9ab1a/' + lat + ',' + long + "?&units=auto";
    // Get weather data through JSON
    $.getJSON(api, function(data) {

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
    });




    /*$.getJSON(api, function(data) {
      var fTemp;
      var cTemp;
      var kTemp;
      var tempSwap = true;
      //List needed data from api
      var weatherType = data.weather[0].description;
      kTemp = data.main.temp;
      var city = data.name;
      var country = data.sys.country;

      //Temperature in Fahrenheit
      fTemp = (kTemp * (9 / 5) - 459.67).toFixed(1);
      //temperature in Celcius
      cTemp = (kTemp - 273).toFixed(1);

      //Assign html elements
      $("#location").html("Local weather in: " + city + ", " + country);
      $("#weatherType").html(weatherType);
      $("#degree").html(cTemp + " &#8451");


      $("#degree").click(function() {
        if (tempSwap == false) {
          $("#degree").html(cTemp + " &#8451");
          tempSwap = true;
        } else {
          $("#degree").html(fTemp + " &#8457");
          tempSwap = false;
        }
      });

      //If statements for image -- Weathertype and time
      //Clear sky, day
      if (weatherType == 'clear sky') {
        $("#weatherState").attr("class", "wi wi-day-sunny");
      } else if (weatherType == 'scattered clouds' || weatherType == 'broken clouds') {
        $("#weatherState").attr("class", "wi wi-cloudy");
      } //Few clouds, day
      else if (weatherType == 'few clouds') {
        $("#weatherState").attr("class", "wi wi-cloudy");
      } //Rain, day
      else if (weatherType == 'light intensity shower rain' || weatherType == 'shower rain' || weatherType == 'rain') {
        $("#weatherState").attr("class", "wi wi-rain");
      } //Thunderstorm, day & night
      else if (weatherType == 'thunderstorm') {
        $("#weatherState").attr("class", "wi wi-thunderstorm");
      } //Snow, day & night
      else if (weatherType == 'snow') {
        $("#weatherState").attr("class", "wi wi-snow");
      } //else -- mist, day & night
      else {
        $("#cloweatherStateuds").attr("class", "wi wi-fog");
      }



    });*/

  });

});
