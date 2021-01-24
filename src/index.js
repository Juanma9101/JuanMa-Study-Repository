//challenge 1
let now = new Date();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let timePlaceholder = document.querySelector("#current-date");
let currentDay = day[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

timePlaceholder.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

//Change City and calls function show tempo current

function showTempCurrent(response) {
  console.log(response);
  let currentCity = response.data.name;

  //change city
  let appCity = document.querySelector("#the-city");
  appCity.innerHTML = `${currentCity}`;
  //change temperature
  let currentTemperature = Math.round(response.data.main.temp);
  let appCelcius = document.querySelector("#current-temp");
  appCelcius.innerHTML = currentTemperature;
  //feels like
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  let feelLike = document.querySelector("#feels-like");
  feelLike.innerHTML = `${currentFeelsLike}º`;
  //change Icon
  let iconMain = document.querySelector("#icon-main");
  iconMain.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconMain.setAttribute("alt", `${response.data.weather[0].description}`);
}

function changeCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city");
  let apiKey = "b42ac237acb0c2946d3192e9602ec4be";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiEndPoint}${newCity.value}&units=metric&appid=${apiKey}`)
    .then(showTempCurrent);
}

//City Search Selector
let userCity = document.querySelector("#search-form");
userCity.addEventListener("submit", changeCity);

//Convert Temperature

function changeCelcius(event) {
  let appCelcius = document.querySelector("#current-temp");
  appCelcius.innerHTML = "15";
}

function changeCFar(event) {
  let appFar = document.querySelector("#current-temp");
  appFar.innerHTML = "58";
}

let tempC = document.querySelector("#celcius");
let tempF = document.querySelector("#far");

tempC.addEventListener("click", changeCelcius);
tempF.addEventListener("click", changeCFar);

//Current Position Button

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b42ac237acb0c2946d3192e9602ec4be";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(
      `${apiEndPoint}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(showTempCurrent);
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let butCurrentCity = document.querySelector("#current-location");
butCurrentCity.addEventListener("click", getGeolocation);
