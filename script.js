$(document).ready(function(){

    function forecast(searchCity){
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=imperial" +"&APPID=e1a3479820563a2c503617a91d1ec1d3";
        $.ajax({
            type: "GET",
            url: queryURL,
        }).then(function(response){
            
            var forecastArr = response.list;
            for (let i = 0; i < forecastArr.length; i++) {
                console.log("test", forecastArr[i]);
            //create a var called col=div add a class
                
            }
        })
    }






    $("#searchButton").on("click", function(event){
        event.preventDefault();
        
        var city = $("#city").val().trim();
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=e1a3479820563a2c503617a91d1ec1d3";
        //local storage
        localStorage.setItem("city", city);
        console.log(localStorage);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
          console.log(response);

          //creating variables for each output from javascript object
          var cityName = (response.name);
          $("#cityName").html(cityName);
          console.log(cityName);
          
          var icon = (response.weather[0].icon);
          $("#icon").html("<img src='http://openweathermap.org/img/w/" + icon + ".png' alt='Icon depicting current weather.'>")
          
          var temp = Math.round(response.main.temp);
          $("#temp").html("Local temp: " + temp + "&deg; F");

          var humidity = Math.round(response.main.humidity);
          $("#humidity").html("Humidity: " + humidity + "%");

          var wind = (response.wind.speed);
          $("#wind").html("Wind Speed: " + wind + " mph");

        })
     forecast(city);   
    })

})