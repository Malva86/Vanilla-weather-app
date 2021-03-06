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

//Function for forecastDay.dt
function formatForecastDay(timestamp) {
  let dateForecast = new Date(timestamp * 1000);
  let dayForecast = dateForecast.getDay();
  let daysForecast = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return daysForecast[dayForecast];
}

//Wheater forecast form temperature template
function displayForecastFormTemplate(response) {
  //response for API
  let forecastForm = response.data.daily;

  let forecastEle = document.querySelector("#weather-form-forecast");
  let forecastHTML = `<div class="row">`; //String for (forecastHTML +) and div for row
  //let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecastForm.forEach(function (forecastDay, index) {
    if (index < 6) {
      //change days by forecasForm
      forecastHTML =
        forecastHTML +
        `<div class="col-2 weather-form-border">
    <div class="weather-form-day">
      <strong>${formatForecastDay(forecastDay.dt)}</strong>
    </div>
    <img
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt="icon"
      class="weather-form-icon"
    />
    <div class="wether-form-temp">
      <span class="weather-form-temp-max">${Math.round(
        forecastDay.temp.max
      )}</span>° |
      <span class="weather-form-temp-min">${Math.round(
        forecastDay.temp.min
      )}</span>°
    </div>
    <div>
      <span class="max-and-min">max | min</span>
    </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`; //End of row
  forecastEle.innerHTML = forecastHTML;
} //displayForecast(); at API

//API forecast form - lon and lat

function getForecastFormTemplate(coordinates) {
  let apiKey = "f4694dab77f16eded26a08442f7ba9ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastFormTemplate);
}

//API, City input,button Confirm
function showTemp(response) {
  let windDeg = Math.round(response.data.wind.deg);

  kmSpeed = response.data.wind.speed; // null global function from unit converter
  let windSpeed = Math.round(kmSpeed);

  let humidity = Math.round(response.data.main.humidity);
  let pressure = Math.round(response.data.main.pressure);

  celTemp = response.data.main.temp; // null global function from unit converter
  let tempD = Math.round(celTemp);

  celMaxTemp = response.data.main.temp_max; // null global function from unit converter
  let tempMax = Math.round(celMaxTemp);

  celMinTemp = response.data.main.temp_min; // null global function from unit converter
  let tempMin = Math.round(celMinTemp);

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

  /*Icon change*/
  let iconEle = document.querySelector("#main-icon");
  iconEle.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecastFormTemplate(response.data.coord);
}

//City search engine

//Old function without auto-serch
//function search(event) {
// event.preventDefault();
//let city = document.querySelector("#input-form").value;
//let apiKey = "f4694dab77f16eded26a08442f7ba9ab";
// let unit = "metric";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
//axios.get(apiUrl).then(showTemp);
//}

//let buttonConnfirm = document.querySelector("#confirm-button");
//buttonConnfirm.addEventListener("click", search);

//New function of city search witch auto serch
function search(city) {
  let apiKey = "f4694dab77f16eded26a08442f7ba9ab";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-form");
  search(city.value);
}

search("Warsaw");

let buttonConnfirm = document.querySelector("#city-form-enter");
buttonConnfirm.addEventListener("submit", handleSubmit);

//Geolocation
function retrivePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "f4694dab77f16eded26a08442f7ba9ab";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiURL).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let windDeg = Math.round(response.data.wind.deg);

  kmSpeed = response.data.wind.speed; // null global function from unit converter
  let windSpeed = Math.round(kmSpeed);

  let humidity = Math.round(response.data.main.humidity);
  let pressure = Math.round(response.data.main.pressure);

  celTemp = response.data.main.temp; // null global function from unit converter
  let tempD = Math.round(celTemp);

  celMaxTemp = response.data.main.temp_max; // null global function from unit converter
  let tempMax = Math.round(celMaxTemp);

  celMinTemp = response.data.main.temp_min; // null global function from unit converter
  let tempMin = Math.round(celMinTemp);

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

  //Weather forecast form API
  getForecastFormTemplate(response.data.coord);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrivePosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

//Unit converter
//°C to °F
function convertFar(event) {
  event.preventDefault();
  let tempCel = document.querySelector("#main-current-temp");
  //romove nad add active to link (color and link change)
  celConvertLink.classList.remove("active");
  farConvertLink.classList.add("active");

  let tempFar = (celTemp * 9) / 5 + 32;
  tempCel.innerHTML = Math.round(tempFar);
}

//°F to °C
function convertCel(event) {
  event.preventDefault();
  let tempCel = document.querySelector("#main-current-temp");
  //romove nad add active to link (color and link change)
  celConvertLink.classList.add("active");
  farConvertLink.classList.remove("active");

  tempCel.innerHTML = Math.round(celTemp);
}

//Max C to F
function convertFarMax(event) {
  event.preventDefault();
  let tempMaxCel = document.querySelector("#main-max-temp");
  celConvertLinkMax.classList.remove("active");
  farConvertLinkMax.classList.add("active");

  let tempMaxFar = (celMaxTemp * 9) / 5 + 32;
  tempMaxCel.innerHTML = Math.round(tempMaxFar);
}
//Max F to C
function convertCelMax(event) {
  event.preventDefault();
  let tempMaxCel = document.querySelector("#main-max-temp");
  //romove nad add active to link (color and link change)
  celConvertLinkMax.classList.add("active");
  farConvertLinkMax.classList.remove("active");

  tempMaxCel.innerHTML = Math.round(celMaxTemp);
}

//Min C to F
function convertFarMin(event) {
  event.preventDefault();
  let tempMinCel = document.querySelector("#main-min-temp");
  celConvertLinkMin.classList.remove("active");
  farConvertLinkMin.classList.add("active");

  let tempMinFar = (celMinTemp * 9) / 5 + 32;
  tempMinCel.innerHTML = Math.round(tempMinFar);
}

//Min F to C
function convertCelMin(event) {
  event.preventDefault();
  let tempMinCel = document.querySelector("#main-min-temp");
  celConvertLinkMin.classList.add("active");
  farConvertLinkMin.classList.remove("active");

  tempMinCel.innerHTML = Math.round(celMinTemp);
}

//km/h to mph
function convertMile(event) {
  event.preventDefault();
  let kmWindSpeed = document.querySelector("#wind-speed");

  //romove nad add active to link (color and link change)
  kmConvertLink.classList.remove("active");
  mileConvertLink.classList.add("active");

  let mileWindSpeed = kmSpeed / 1.609344;
  kmWindSpeed.innerHTML = Math.round(mileWindSpeed);
}

//mph to km/h
function convertKm(event) {
  event.preventDefault();
  let mileWindSpeed = document.querySelector("#wind-speed");

  //romove nad add active to link (color and link change)
  kmConvertLink.classList.add("active");
  mileConvertLink.classList.remove("active");

  mileWindSpeed.innerHTML = Math.round(kmSpeed);
}

//Function null - pod function search(event)
let celTemp = null;
let celMaxTemp = null;
let celMinTemp = null;
let kmSpeed = null;

//°C to °F
let farConvertLink = document.querySelector("#far-link");
farConvertLink.addEventListener("click", convertFar);

//Max
let farConvertLinkMax = document.querySelector("#far-link-max");
farConvertLinkMax.addEventListener("click", convertFarMax);

//Min
let farConvertLinkMin = document.querySelector("#far-link-min");
farConvertLinkMin.addEventListener("click", convertFarMin);

//°F to °C
let celConvertLink = document.querySelector("#cel-link");
celConvertLink.addEventListener("click", convertCel);

//Max
let celConvertLinkMax = document.querySelector("#cel-link-max");
celConvertLinkMax.addEventListener("click", convertCelMax);

//Min
let celConvertLinkMin = document.querySelector("#cel-link-min");
celConvertLinkMin.addEventListener("click", convertCelMin);

//km/h to mph
let mileConvertLink = document.querySelector("#m-link");
mileConvertLink.addEventListener("click", convertMile);

//mph to km/h
let kmConvertLink = document.querySelector("#km-link");
kmConvertLink.addEventListener("click", convertKm);
