var weatherApiKey = "5eab078dd93d8edbe65b584312d7580a";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory"))||[]
var userSearchEl = $("#userInput");
var pastSearch = $("#pastSearch");
var currentForecast = $("currentForcast");
var fiveDay = $("fiveDay");

function clickEvent() {
  var userInput = $(this).siblings("input").val();
  geoSearch(userInput)
  save(userInput)
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
                  
                  console.log(data)
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

pastSearch.on("click","button")
$("#userInputBtn").on("click", clickEvent);
pastSearchHistory()
