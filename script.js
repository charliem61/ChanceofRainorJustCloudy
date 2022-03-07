var weatherApiKey = "5eab078dd93d8edbe65b584312d7580a";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory"))||[]
var userSearchEl = $("#userInput");
var pastSearch = $("#pastSearch");
var currentForecast = $("currentForcast");
var fiveDay = $("fiveDay");

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
function renderCurrentForcast(){
  var card=`<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
}

pastSearch.on("click","button",clickEvent)
$("#userInputBtn").on("click", clickEvent);
pastSearchHistory()

// Render current forcast using card template above on line fifty-sixty
// use same card template for 5day

