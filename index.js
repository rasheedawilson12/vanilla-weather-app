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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `         <div class="col-2">
                <div class="weather-forecast-date">
                ${day}
                </div>
                <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="" width="42"/>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 
                    18°
                  </span>
                  <span class="weather-forecast-temperature-min">
                    12°
                  </span>
                </div>
                
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(repsonce) {
  console.log(repsonce.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = repsonce.data.main.temp;

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

  getForecast(repsonce.data.coord);
}

function search(city) {
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("New York");
