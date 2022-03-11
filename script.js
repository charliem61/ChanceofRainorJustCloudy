var weatherApiKey = "5eab078dd93d8edbe65b584312d7580a";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory"))||[]
var userSearchEl = $("#userInput");
var pastSearch = $("#pastSearch");
var currentForecast = $("#currentForecast");
var fiveDay = $("#fiveDay");

function clickEvent() {
  if($(this).attr("id")==="userInputBtn"){
    var userInput = $(this).siblings("input").val();
    save(userInput)
    $(this).siblings("input").val("");
  }else{
    var userInput=$(this).text()
  }
  geoSearch(userInput)
}
function geoSearch(city) {
  var geoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherApiKey}`;
  fetch(geoCoding)
  .then(function(response){
            return response.json()
  }).then(function(data){
          
          console.log(data)
          weatherSearch(data[0].lat,data[0].lon)
  })
}
function weatherSearch(lat,lon){
          var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`
          fetch(oneCall)
          .then(function(response){
                    return response.json()
          }).then(function(data){
                  renderCurrentForecast(data.current)
                  console.log(data)
                  renderFiveDayForecast(data.daily)

          })
}
function pastSearchHistory(){
  pastSearch.empty()
  searchHistory.forEach(function(text){
    var btnEl=$("<button>")
    btnEl.text(text)
    pastSearch.append(btnEl)
  })
}
function save(userInput){
          searchHistory.push(userInput)
          localStorage.setItem("searchHistory",JSON.stringify(searchHistory))
          pastSearchHistory()
}
function renderCurrentForecast(todaysForecast){
  var card=`<div class="card" style="width: 18rem;">
  <img src="http://openweathermap.org/img/wn/${todaysForecast.weather[0].icon}@2x.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Todays Forecast</h5>
    <p class="card-text">Tempature: ${todaysForecast.temp}</p>
    <p class="card-text">Wind Speed: ${todaysForecast.wind_speed}</p>
    <p class="card-text">Humidity: ${todaysForecast.humidity}</p>
    <p class="card-text">UV Index: ${todaysForecast.uvi}</p>
    </div>
</div>`
currentForecast.empty()
currentForecast.append(card)
}
function renderFiveDayForecast(fiveDayForecast){
  fiveDay.empty()

  for(var i=0; i<5; i++){

  var card=`<div class="col-2 card" style="width: 18rem;">
  <img src="http://openweathermap.org/img/wn/${fiveDayForecast[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">5 Day Forecast</h5>
    <p class="card-text">Tempature: ${fiveDayForecast[i].temp.day}</p>
    <p class="card-text">Wind Speed: ${fiveDayForecast[i].wind_speed}</p>
    <p class="card-text">Humidity: ${fiveDayForecast[i].humidity}</p>
    <p class="card-text">UV Index: ${fiveDayForecast[i].uvi}</p>
    </div>
</div>`
fiveDay.append(card)
  }
}

pastSearch.on("click","button",clickEvent)
$("#userInputBtn").on("click", clickEvent);
pastSearchHistory()

