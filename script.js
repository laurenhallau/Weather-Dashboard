$(document).ready(function(){
    $("#searchButton").on("click", function(event){
        event.preventDefault();
        localStorage.setItem(city, location);//help with local storage of city entered
        var city = $("#city").val().trim();
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=e1a3479820563a2c503617a91d1ec1d3";
        var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&mode=xml" + "&APPID=e1a3479820563a2c503617a91d1ec1d3";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
          console.log(response);

          //creating variables for each output from javascript object
          var cityName = (response.name);
          $("#cityName").html(cityName);
          console.log(cityName);
          localStorage.setItem(cityName, historyRow);

          var icon = (response.weather[0].icon);
          $("#icon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png' alt='Icon depicting current weather.'>")
          
          var temp = Math.round(response.main.temp);
          $("#temp").html("Local temp: " + temp + "&deg; F");

          var humidity = Math.round(response.main.humidity);
          $("#humidity").html("Humidity: " + humidity + "%");
        })
        
    })
})