const input = document.querySelector("input");
const enter = document.querySelector(".enter");
const tempHeading = document.querySelector(".temperature-heading");
const toggleTemp = document.querySelector(".toggle-temp");
const weatherForm = document.querySelector(".weather-form");
const img = document.querySelector("img");
let fahrenheitTemp;
let celsiusTemp;

function tempHeadingText(temp, temptype) {
  return `The temperature in ${input.value} is ${temp} degrees ${temptype}`;
}

function fahrenheit() {
  tempHeading.textContent = tempHeadingText(fahrenheitTemp, "Fahrenheit");
}

function celsius() {
  tempHeading.textContent = tempHeadingText(celsiusTemp, "Celsius");
}

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  async function getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=305bf549d780bb9050197998ae89374a`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    fahrenheitTemp = Math.round(
      ((weatherData.main.temp - 273.15) * 9) / 5 + 32
    );
    celsiusTemp = Math.round(weatherData.main.temp - 273.15);
    fahrenheit();
  }

  async function getImages() {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=XChkQ8QlWMuzwnDYxai5JNXp0Kc0rNEj&s=ice`,
      { mode: "cors" }
    );
    const imageData = await response.json();
    img.src = imageData.data.images.original.url;
  }

  getImages();
  getWeather();
});

toggleTemp.addEventListener("click", function () {
  if (tempHeading.textContent.slice(-1) === "t") {
    celsius();
  } else {
    fahrenheit();
  }
});
