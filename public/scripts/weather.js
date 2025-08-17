(() => {
  // Detect environment and set appropriate server URL
  const getServerBaseUrl = () => {
    // If running in development (localhost)
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      return 'http://localhost:10000';
    }
    // If running on Vercel, mobile, or any other deployment, use same origin
    return window.location.origin;
  };

  const CONFIG = {
    serverBaseUrl: getServerBaseUrl(),
    timeFormat: {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  };

  const fetchWeatherData = async (city) => {
    if (!city?.trim()) {
      throw new Error('City name is required');
    }

    const weatherUrl = `${
      CONFIG.serverBaseUrl
    }/weather?city=${encodeURIComponent(city)}`;

    console.log('Fetching weather from:', weatherUrl); // Debug log
    console.log('Current location:', window.location.origin); // Debug log

    try {
      const response = await fetch(weatherUrl);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response error:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error('Fetch error details:', error);
      // Check if it's a network error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error - unable to connect to server');
      }
      throw error;
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000)
      .toLocaleTimeString('en-US', CONFIG.timeFormat)
      .toLowerCase();
  };

  const updateWeatherUI = (element, value) => {
    const el = document.querySelector(element);
    if (el) el.innerText = value;
  };

  function displayResults(weather) {
    if (!weather) return;

    updateWeatherUI('.city', weather.timezone);
    updateWeatherUI('.date', dateBuilder(new Date()));
    updateWeatherUI('.sunrise', formatTime(weather.current.sunrise));
    updateWeatherUI('.sunset', formatTime(weather.current.sunset));

    const weatherIcon = document.querySelector('.image .weather-icon');
    if (weatherIcon) {
      weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png" 
        onerror="this.onerror=null; this.src='/images/weather-default.png'"/>`;
    }

    const temp = document.querySelector('.temp');
    if (temp) {
      temp.innerHTML = `${Math.round(weather.current.temp)}<span>°C</span>`;
    }

    updateWeatherUI(
      '.weather',
      weather.current.weather[0].description.charAt(0).toUpperCase() +
        weather.current.weather[0].description.slice(1)
    );
    updateWeatherUI('.wind', `${weather.current.wind_speed} km/h`);
    updateWeatherUI('.humidity', `${weather.current.humidity}%`);
    updateWeatherUI('.visibility', `${weather.current.visibility} m`);
  }

  const dateBuilder = (date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return `${days[date.getDay()]} ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      const searchbox = event.target;
      const query = searchbox.value.trim();

      if (!query) return;

      try {
        const weatherData = await fetchWeatherData(query);
        displayResults(weatherData);
      } catch (error) {
        console.error('Weather fetch error:', error);
        alert(`Unable to get weather data: ${error.message}`);
      } finally {
        searchbox.value = '';
      }
    }
  };

  // Initialize
  const searchbox = document.querySelector('.search-box');
  if (searchbox) {
    searchbox.addEventListener('keypress', handleSearch);
  }
})();
