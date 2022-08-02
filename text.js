/* selecting elements from heml using different query selectors
and storing them to respective variables */
let inputValue = document.getElementById("searchbar");
let city = document.querySelector(".name");
let temperature = document.querySelector(".temp");
let windSpeed = document.querySelector(".wind");
let humiditydisplay = document.querySelector(".humm");
let weathercondition = document.getElementById("rain");
let button = document.getElementById("submitb");
let icon = document.getElementById("icon");
let date = document.getElementById("date");
let pressure = document.getElementById("pressure");
let direction = document.getElementById("direction");

/* defining function to get weather data from api 
and change the values in HTML */
function gettingWeather(val) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      val +
      "&appid=176d67a4f29f97071d97c6a42d0d543e"
  )
    /* the response from the fetched api is returned in json
  format and stored in data, then it is extracted and 
  HTML elements are changed so on */
    .then((response) => response.json())
    .then((data) => {
      const { name } = data;
      const { temp, humidity } = data.main;
      const { speed, deg } = data.wind;
      const description = data.weather[0].description;

      icon.src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

      city.innerHTML = name;

      // converting temperature from kelvin to degree
      temperature.innerHTML = (temp - 273.15).toFixed(2) + "° C";
      humiditydisplay.innerHTML = "Humidity : " + humidity + "%";
      windSpeed.innerHTML = "Wind speed : " + speed + " m/s";
      direction.innerHTML = "Wind Direction : " + deg + "°";
      weathercondition.innerHTML = description;
      let d = new Date(data.dt * 1000);
      date.innerHTML = d.toDateString();
      inputValue.value = "";
    });
}

/* initial value is set for Pokhara by calling gettingWeather
with value pokhara */
gettingWeather("pokhara");

/* this is for search button to be clicked which will call
the gettingWeather function with value from search bar */
button.addEventListener("click", function (name) {
  gettingWeather(inputValue.value);
});

/* this is for "Enter" key is pressed while you are in search
bar. This will also call gettingWeather function with value 
from search bar as parameter" */
inputValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    gettingWeather(inputValue.value);
  }
});
