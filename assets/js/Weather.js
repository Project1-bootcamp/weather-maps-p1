console.log('if you are reading this then its linked to your HTML');

function displayMovieInfo() {

    var weather = $(this).attr("data-name");
    var API_KEY = 'MgwflFY3uJycuTCUpzJQJsiuV6wHAGA9&limit=10'
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + weather + API_KEY;

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var weatherDiv = $("<div class='weather'>");

        // Storing the rating data

        // Displaying the rating
        weatherDiv.append();
        console.log(weatherDiv);
    });
};