function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0:${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayTemperature(repsonce) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(repsonce.data.main.temp);
  cityElement.innerHTML = repsonce.data.name;
  descriptionElement.innerHTML = repsonce.data.weather[0].description;
  humidityElement.innerHTML = repsonce.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(repsonce.data.wind.speed);
  dateElement.innerHTML = formatDate(repsonce.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${repsonce.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", repsonce.data.weather[0].description);
}

let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
let city = "los angeles";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
