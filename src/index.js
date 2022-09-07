let now = new Date();
let time = document.querySelector("#time");

let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

let day = days[now.getDay()];

time.innerHTML = `${day}, ${hours}:${minutes}`;

// search bar
function citySearch(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#city-input");
  searchBar.innerHTML = searchBar.value;
  let city = document.querySelector("h1");

  let apiKey = "5fb2817fa3d0764008333a7517e3e6c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=5fb2817fa3d0764008333a7517e3e6c1&units=metric`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showMinTemp);
  axios.get(apiUrl).then(showMaxTemp);
  axios.get(apiUrl).then(showHumidity);
  axios.get(apiUrl).then(showWind);
  axios.get(apiUrl).then(feelsLike);

  if (searchBar.value) {
    city.innerHTML = searchBar.value;
  } else {
    alert(`Please select location`);
  }
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temp}°C`;
}

function showMinTemp(response) {
  let minimum = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#min");
  minTemp.innerHTML = `Min ${minimum}°C`;
}

function showMaxTemp(response) {
  let maximum = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#max");
  maxTemp.innerHTML = `Max ${maximum}°C`;
}

function showHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `💦 Humidity: ${humidity}%`;
}

function showWind(response) {
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `💨 Wind: ${windSpeed} km/h`;
}

function feelsLike(response) {
  let feels = Math.round(response.data.main.feels_like);
  let feelsElement = document.querySelector("#feels-like");
  feelsElement.innerHTML = `😌 Feels Like: ${feels}°C`;
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", citySearch);
