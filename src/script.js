function formatDate(dateinfo) {
  let date = new Date(dateinfo);
  console.log(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecast = document.querySelector("#forecastdays");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="max-tempreture"> 18° </span>
          <span class="min-tempreture"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#cityname").innerHTML = response.data.name;

  document.querySelector("#todayWeather").innerHTML = Math.round(
    response.data.main.temp
  );

  exactTemp = response.data.main.temp;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", `${response.data.weather[0].description}`);
}

function searchCity(city) {
  let Appkey = "984f5a7c489eb91ea3f8c3eb812a5080";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Appkey}&units=metric`;
  axios.get(weatherUrl).then(displayWeatherCondition);
}

function getInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity");
  console.log(city);

  searchCity(city.value);
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", getInfo);

let exactTemp = 11;

function changeTempF(event) {
  event.preventDefault();
  let FahrehhietValue = Math.round((exactTemp * 9) / 5 + 32);
  changeTocelcius.classList.remove("active");
  changeToFahrenhiet.classList.add("active");
  document.querySelector("#todayWeather").innerHTML = FahrehhietValue;
}
function changeTempC(event) {
  event.preventDefault();
  document.querySelector("#todayWeather").innerHTML = Math.round(exactTemp);
  changeTocelcius.classList.add("active");
  changeToFahrenhiet.classList.remove("active");
}

let changeToFahrenhiet = document.querySelector("#Fahrenheit-link");
changeToFahrenhiet.addEventListener("click", changeTempF);

let changeTocelcius = document.querySelector("#celcius-link");
changeTocelcius.addEventListener("click", changeTempC);
displayForecast();
