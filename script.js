const API_KEY = '9afab1350718864616f54a942d28c922';

// Элементы интерфейса
const elements = {
  cityName: document.getElementById('city-name'),
  temperature: document.getElementById('temperature'),
  description: document.getElementById('description'),
  details: document.getElementById('details'),
  weatherIcon: document.getElementById('weather-icon')
};

// Обновление интерфейса
function updateUI(data) {
  elements.cityName.textContent = data.name;
  elements.temperature.textContent = ${Math.round(data.main.temp)}°C;
  elements.description.textContent = data.weather[0].description;
  elements.details.textContent = Влажность: ${data.main.humidity}% | Ветер: ${Math.round(data.wind.speed)} км/ч;
  elements.weatherIcon.src = https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png;
}

// Геолокация
document.getElementById('location-btn').addEventListener('click', () => {
  console.log('Запрос геолокации...');
  
  if (!navigator.geolocation) {
    alert('Ваш браузер не поддерживает геолокацию');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        console.log('Координаты:', latitude, longitude);
        
        const response = await fetch(
          https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru
        );
        
        if (!response.ok) throw new Error('Ошибка API');
        const data = await response.json();
        updateUI(data);
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось получить погоду');
      }
    },
    (error) => {
      console.error('Ошибка геолокации:', error);
      alert('Доступ к геолокации запрещён');
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

// Поиск по городу
document.getElementById('search-btn').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;

  try {
    const response = await fetch(
      https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru
    );
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert('Город не найден');
  }
});

// Проверка при загрузке
window.addEventListener('DOMContentLoaded', () => {
  console.log('Приложение загружено');
});
