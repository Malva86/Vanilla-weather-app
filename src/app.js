//Date and hour
let now = new Date();
let mainDate = document.querySelector("#main-date-id");
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
mainDate.innerHTML = `<strong>${day}</strong> | ${date}.${month}.${year}, ${hours}:${minutes}`;

//API, City input,button Confirm
function showTemp(response) {
  console.log(response);
  let tempD = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  let windSpeed = Math.round(response.data.wind.speed);
  let windDeg = Math.round(response.data.wind.deg);
  let humidity = Math.round(response.data.main.humidity);
  let pressure = Math.round(response.data.main.pressure);
  let country = response.data.sys.country;
  let mainCity = response.data.name;
  let des = response.data.weather[0].description;
  let desM = document.querySelector("#main-des");
  let countryMain = document.querySelector("#main-country");
  let dayTemp = document.querySelector("#main-current-temp");
  let minTemp = document.querySelector("#main-min-temp");
  let maxTemp = document.querySelector("#main-max-temp");
  let windS = document.querySelector("#wind-speed");
  let windD = document.querySelector("#wind-deg");
  let humi = document.querySelector("#humidity");
  let press = document.querySelector("#pressure");
  let mainCityName = document.querySelector("#main-city-name");
  let iconEle = document.querySelector("#main-icon");
  desM.innerHTML = `${des}`;
  countryMain.innerHTML = `${country}`;
  mainCityName.innerHTML = `${mainCity}`;
  dayTemp.innerHTML = `${tempD}`;
  minTemp.innerHTML = `${tempMin}`;
  maxTemp.innerHTML = `${tempMax}`;
  windS.innerHTML = `${windSpeed}`;
  windD.innerHTML = `${windDeg}`;
  humi.innerHTML = `${humidity}`;
  press.innerHTML = `${pressure}`;
  iconEle.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#input-form").value;
  let apiKey = "f4694dab77f16eded26a08442f7ba9ab";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

let buttonConnfirm = document.querySelector("#confirm-button");
buttonConnfirm.addEventListener("click", search);

//Geolocation
function retrivePosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "f4694dab77f16eded26a08442f7ba9ab";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiURL).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let tempD = Math.round(response.data.main.temp);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  let windSpeed = Math.round(response.data.wind.speed);
  let windDeg = Math.round(response.data.wind.deg);
  let humidity = Math.round(response.data.main.humidity);
  let pressure = Math.round(response.data.main.pressure);
  let country = response.data.sys.country;
  let mainCity = response.data.name;
  let des = response.data.weather[0].description;
  let desM = document.querySelector("#main-des");
  let countryMain = document.querySelector("#main-country");
  let dayTemp = document.querySelector("#main-current-temp");
  let minTemp = document.querySelector("#main-min-temp");
  let maxTemp = document.querySelector("#main-max-temp");
  let windS = document.querySelector("#wind-speed");
  let windD = document.querySelector("#wind-deg");
  let humi = document.querySelector("#humidity");
  let press = document.querySelector("#pressure");
  let mainCityName = document.querySelector("#main-city-name");
  desM.innerHTML = `${des}`;
  countryMain.innerHTML = `${country}`;
  mainCityName.innerHTML = `${mainCity}`;
  dayTemp.innerHTML = `${tempD}`;
  minTemp.innerHTML = `${tempMin}`;
  maxTemp.innerHTML = `${tempMax}`;
  windS.innerHTML = `${windSpeed}`;
  windD.innerHTML = `${windDeg}`;
  humi.innerHTML = `${humidity}`;
  press.innerHTML = `${pressure}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrivePosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);
