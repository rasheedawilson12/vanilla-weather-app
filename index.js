function displayTemperature(repsonce) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = repsonce.data.main.temp;
}
let apiKey = "9t257307ca476845c0efc0e5f24o9bc3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
