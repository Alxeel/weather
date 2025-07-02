const API_KEY = '9afab1350718864616f54a942d28c922'; // Замените на реальный!

// Функция обновления интерфейса
function updateUI(data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('temperature').textContent = ${Math.round(data.main.temp)}°C;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('details').textContent = 
    Влажность: ${data.main.humidity}% | Ветер: ${Math.round(data.wind.speed)} км/ч;
  document.getElementById('weather-icon').src = 
    https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png;
}

// Определение местоположения (новый надежный вариант)
document.getElementById('location-btn').addEventListener('click', async () => {
  console.log('Кнопка нажата!'); // Проверка срабатывания
  
  if (!navigator.geolocation) {
    alert('Ваш браузер не поддерживает геолокацию');
    return;
  }

  try {
    console.log('Запрос координат...');
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
    
    console.log('Координаты получены:', position.coords);
    const { latitude, longitude } = position.coords;
    
    const response = await fetch(
      https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru
    );
    
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    updateUI(data);
    
  } catch (error) {
    console.error('Ошибка:', error);
    alert(Ошибка: ${error.message || 'Не удалось получить данные'});
  }
});

// Поиск по городу
document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;
  
  fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru)
    .then(response => response.json())
    .then(updateUI)
    .catch(() => alert('Город не найден'));
});

// Проверка API ключа при загрузке
window.addEventListener('DOMContentLoaded', () => {
  if (!API_KEY || API_KEY.includes('ваш_ключ')) {
    alert('Замените API_KEY на реальный ключ!');
  }
});
