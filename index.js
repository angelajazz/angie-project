let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${hour}:${minutes}`;

let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", search);

function showWeather(response) {
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  let number = document.querySelector("#number");
  let h5 = document.querySelector("h5");
  h3.innerHTML = `${response.data.name}`;
  h5.innerHTML = `${response.data.weather[0].description}`;
  number.innerHTML = `${temperature}°C`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "da282525e55f95a4cb19896aa6f33352";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "da282525e55f95a4cb19896aa6f33352";
  let latit = position.coords.latitude;
  let longit = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${longit}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getCurrentLocation);
