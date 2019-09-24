$(document).ready(function () {
  // TODO: Event listener (click.event)

  $("#submitCity").click(function () {
    return getWeather();
  });

  function getWeather() {
    var city = $("#city").val();
    console.log("city val: " + city)
    if (city == "") {
      // todo Get user location.
      city = "chicago"
    }
    console.log('chicago should be city now: ' + city)
    if (city != "") {
      console.log(`condidtion met`)
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric" +
          "&APPID=db8ae854ac64cec183d353c35b79a520",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
          console.log(`successful ajax: ${data}`)
          var info = showResults(data);

          // console.log(info)

          $("#showWeather").html(info);


          $("#city").val("");
        }
      });
    } else {
      $("#error").html(
        "<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>"
      );
    }
  }
  getWeather()

  function showResults(data) {
    console.log(`data.weather[0]: ${data.weather[0].description}`)
    return (
      '<h2 style="font-weight:bold; font-size:30px; padding-top:20px;" class="text-center">Current Weather for ' +
      data.name +
      ", " +
      data.sys.country +
      "</h2>" +
      "<h3 style='padding-left:40px;'><strong>Description</strong>:<img src='http://openweathermap.org/img/w/" +
      data.weather[0].icon +
      ".png'> " +
      data.weather[0].description +
      "</h3>" +
      "<h3 style='padding-left:40px;'><strong>Temperature</strong>: " +
      data.main.temp +
      " &deg;C</h3>" +
      "<h3 style='padding-left:40px;'><strong>Humidity</strong>: " +
      data.main.humidity +
      "%</h3>" +
      "<h3 style='padding-left:40px;'><strong>Min Temperature</strong>: " +
      data.main.temp_min +
      "&deg;C</h3>" +
      "<h3 style='padding-left:40px;'><strong>Max Temperature</strong>: " +
      data.main.temp_max +
      "&deg;C</h3>" +
      "<h3 style='padding-left:40px;'><strong>Wind Speed</strong>: " +
      data.wind.speed +
      "m/s</h3>"
    );
  }
  // function celsiusToFahrenheit(temperature) {
  //   return (temperature * 9 / 5) + 32;
  // }

  // //WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
  // temperature.addEventListener("click", function () {
  //   if (weather.temperature.value === undefined) return;

  //   if (weather.temperature.unit == "celsius") {
  //     let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
  //     fahrenheit = Math.floor(fahrenheit);

  //     temperature.innerHTML = `${fahrenheit}°<span>F</span>`;
  //     weather.temperature.unit = "fahrenheit";
  //   } else {
  //     temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  //     weather.temperature.unit = "celsius"
  //   }

  // });

})
