$(document).ready(function(){
    
    $("#searchButton").on("click", function(event){
        event.preventDefault();
         
        var city = $("#city").val().trim();

        $("#city").val("");
        
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=e1a3479820563a2c503617a91d1ec1d3";
        //local storage
        localStorage.setItem("city", city);
        console.log(localStorage);
        $(".listCityHistory").html(city);

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
     
    });
    
    //function created for the five day forecast
    function forecast(searchCity){
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&APPID=e1a3479820563a2c503617a91d1ec1d3&units=imperial&cnt=5";
        $.ajax({
            type: "GET",
            url: queryURL,
        }).then(function(response){
            
            var forecastArr = response.list;
            for (let i = 0; i < forecastArr.length; i++) {
                console.log("test", forecastArr[i]);
            //create a var called col=div add a class
                var col = $("<div>").addClass("col-md-2");
                var card = $("<div>").addClass("card g-light mb-3"); //creating a card to house the results
                var body = $("<div>").addClass("card-body text-secondary"); //body of the card

                var title = $("<h4>").addClass("card-title").text(new Date(forecastArr[i].dt_txt).toLocaleDateString()); //this line is creating a new title with the text being dynamic, pulling in the date based off of the api
                var img = $("<img>").addClass("src", "http://openweathermap.org/img/w/" + forecastArr[i].weather[0].icon); //adding an image with a link source of openweather 

                var p1 = $("<p>").addClass("card-text").text("Temp: " + forecastArr[i].main.temp_max + "F"); //adding a paragraph which will display the temperature in F
                var p2 = $("<p>").addClass("card-text").text("Wind Speed: " + forecastArr[i].wind.speed + "MPH"); //adding a second paragraph which will display the wind speed in mph


                col.append(card.append(body.append(title, img, p1, p2)));
                $("#fiveDayForecast").append(col);
            }
        })
    }
});