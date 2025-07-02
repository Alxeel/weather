// API ключ
const API_KEY = '9afab1350718864616f54a942d28c922';

// Загрузка погоды
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru
          );
          if (!response.ok) throw new Error("Ошибка API");
          const data = await response.json();
          updateUI(data);
        } catch (error) {
          console.error("Ошибка:", error);
          alert("Не удалось получить погоду для вашего местоположения");
        }
      },
      (error) => {
        console.error("Геолокация:", error);
        alert("Разрешите доступ к геолокации в настройках браузера");
      }
    );
  } else {
    alert("Ваш браузер не поддерживает геолокацию");
  }
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
