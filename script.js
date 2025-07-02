// API ключ
const API_KEY = '9afab1350718864616f54a942d28c922';

// Загрузка погоды
async function getWeather(city) {
  const response = await fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru);
  const data = await response.json();
  document.getElementById('weather-info').innerHTML = `
    <h2>${data.name}</h2>
    <p>${Math.round(data.main.temp)}°C</p>
  `;
}

// Кнопка поиска
document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) getWeather(city);
});

// Регистрация PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}