$(document).ready(function() {
  var lat;
  var long;

  //Get JSON api for user location
  $.getJSON("http://ip-api.com/json", function(data2) {
    lat = data2.lat;
    long = data2.lon;

    //get weather api
    var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=bfef8aa901bdd28808ec6832505b14dd';

    //get JSON to get weather data

    $.getJSON(api, function(data) {
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
        $("#clouds").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/860008/weather_clear.png");
      } else if (weatherType == 'scattered clouds' || weatherType == 'broken clouds') {
        $("#clouds").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/860008/weather_cloudy.png");
      } //Few clouds, day
      else if (weatherType == 'few clouds') {
        $("#clouds").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/860008/weather_clearCloud.png");
      } //Rain, day
      else if (weatherType == 'light intensity shower rain' || weatherType == 'shower rain' || weatherType == 'rain') {
        $("#clouds").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/860008/weather_rain.png");
      } //Thunderstorm, day & night
      else if (weatherType == 'thunderstorm') {
        $("#clouds").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/860008/weather_storm.png");
      } //Snow, day & night
      else if (weatherType == 'snow') {
        $("#clouds").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/860008/weather_snow.png");
      } //else -- mist, day & night
      else {
        $("#clouds").attr("src", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/860008/weather_mist.png");
      }



    });

  });

});
