function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#cityname").innerHTML = response.data.name;

  document.querySelector("#todayWeather").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

let Appkey = "984f5a7c489eb91ea3f8c3eb812a5080";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Isfahan&appid=${Appkey}&units=metric`;
axios.get(weatherUrl).then(displayWeatherCondition);

let currentTime = new Date();
document.querySelector("#date").innerHTML = formatDate(currentTime);
console.log(formatDate(currentTime));
