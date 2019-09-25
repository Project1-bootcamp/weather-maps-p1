$(document).ready(function () {
  var city = ""
  // TODO: Event listener (click.event)

  $("#submitCity").click(function () {
    return getWeather();
  });

  function getLocation() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          $.get("http://ipinfo.io", function (response) {
            // console.log(response.city, response.country);
          }, "jsonp")
        );
      }, 2000);
    });
  }


  async function getWeather() {
    city = $("#city").val();
    console.log("city val: " + city)

    if (city == "") {
      city = await getLocation()
      // $.get("http://ipinfo.io", function (response) {
      //   city = response.city;
      //   console.log(city)
      // }, "jsonp");
      // // todo Get user location.
      // return city
    }

    console.log('chicago should be city now: ' + city.city)
    if (city.city != "") {
      console.log(`condidtion met`)
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/weather?q=" +
          city.city +
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
    var temp = celsiusToFahrenheit(data.main.temp);
    var temp_min = celsiusToFahrenheit(data.main.temp);
    var temp_max = celsiusToFahrenheit(data.main.temp);
    console.log(temp);
    
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
      temp +
      " &deg;F</h3>" +
      "<h3 style='padding-left:40px;'><strong>Humidity</strong>: " +
      data.main.humidity +
      "%</h3>" +
      "<h3 style='padding-left:40px;'><strong>Min Temperature</strong>: " +
      temp_min +
      "&deg;F</h3>" +
      "<h3 style='padding-left:40px;'><strong>Max Temperature</strong>: " +
      temp_max +
      "&deg;F</h3>" +
      "<h3 style='padding-left:40px;'><strong>Wind Speed</strong>: " +
      data.wind.speed +
      "m/s</h3>"
    );
  }


  function celsiusToFahrenheit(temperature) {
    // console.log(temperature);
    
    return (temperature * 9 / 5) + 32;
  }

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
