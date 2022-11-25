function displayTemperature(repsonce) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  temperatureElement.innerHTML = Math.round(repsonce.data.main.temp);
  cityElement.innerHTML = repsonce.data.name;
  descriptionElement.innerHTML = repsonce.data.weather[0].description;
  humidityElement.innerHTML = repsonce.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(repsonce.data.wind.speed);
}

let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
