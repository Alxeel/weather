const API_KEY = '9afab1350718864616f54a942d28c922';

// Тест геолокации (должен выводить координаты)
document.getElementById('location-btn').addEventListener('click', () => {
  console.log('Кнопка геолокации нажата');
  
  if (!navigator.geolocation) {
    alert('Геолокация не поддерживается в вашем браузере');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      alert(Ваши координаты: ${pos.coords.latitude}, ${pos.coords.longitude});
      console.log('Координаты:', pos.coords);
    },
    (err) => {
      alert(Ошибка: ${err.message});
      console.error('Ошибка геолокации:', err);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});

// Тест поиска города (должен выводить ответ API)
document.getElementById('search-btn').addEventListener('click', async () => {
  const city = document.getElementById('city-input').value.trim();
  if (!city) return;

  try {
    console.log('Запрос погоды для:', city);
    const response = await fetch(
      https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru
    );
    const data = await response.json();
    console.log('Ответ API:', data);
    alert(Погода в ${city}: ${data.weather[0].description});
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Ошибка при запросе погоды');
  }
});
