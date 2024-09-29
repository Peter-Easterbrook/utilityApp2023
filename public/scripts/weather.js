// (() => {
//   //Weather app
//   const api = {
//     key: '.env.OPEN_WEATHER_API_KEY',
//     base: 'https://api.openweathermap.org/data/3.0/onecall?',
//   };

//   const fetchCoordinates = async (city) => {
//     const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api.key}`;
//     try {
//       const geoResponse = await fetch(geoUrl);
//       if (!geoResponse.ok) {
//         throw new Error('Failed to fetch coordinates');
//       }
//       const geoData = await geoResponse.json();
//       if (!geoData || geoData.length === 0) {
//         throw new Error('City not found');
//       }
//       return geoData[0];
//     } catch (error) {
//       console.error('Error fetching coordinates:', error);
//       throw error;
//     }
//   };

//   const fetchWeather = async (lat, lon) => {
//     const weatherUrl = `${api.base}lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;
//     try {
//       const weatherResponse = await fetch(weatherUrl);
//       if (!weatherResponse.ok) {
//         throw new Error('Failed to fetch weather data');
//       }
//       const weatherData = await weatherResponse.json();
//       return weatherData;
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       throw error;
//     }
//   };

//   const getWeather = async (city) => {
//     try {
//       const geoData = await fetchCoordinates(city);
//       if (!geoData || !geoData.lat || !geoData.lon) {
//         throw new Error('Invalid coordinates data');
//       }
//       const weatherData = await fetchWeather(geoData.lat, geoData.lon);
//       return weatherData;
//     } catch (error) {
//       console.error('Error getting weather data:', error);
//       alert('Error fetching weather data: ' + error.message);
//     }
//   };

//   const searchbox = document.querySelector('.search-box');
//   searchbox.addEventListener('keypress', setQuery);

//   function setQuery(evt) {
//     if (evt.key === 'Enter') {
//       getResults(searchbox.value);
//       searchbox.value = '';
//     }
//   }

//   function getResults(query) {
//     getWeather(query).then(displayResults);
//   }

//   function displayResults(weather) {
//     if (!weather) return;

//     let city = document.querySelector(' .city');
//     city.innerText = `${weather.timezone}`;

//     let now = new Date();
//     let date = document.querySelector(' .date');
//     date.innerText = dateBuilder(now);

//     let sunrise = document.querySelector('.sunrise');
//     sunrise.innerText = `${new Date(weather.current.sunrise * 1000)
//       .toLocaleTimeString('en-UK', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//       })
//       .toLowerCase()}`;

//     let sunset = document.querySelector('.sunset');
//     sunset.innerText = `${new Date(weather.current.sunset * 1000)
//       .toLocaleTimeString('en-UK', {
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true,
//       })
//       .toLowerCase()}`;

//     let weatherIcon = document.querySelector('.image .weather-icon');
//     weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png"/>`;

//     let temp = document.querySelector('.temp');
//     temp.innerHTML = `${Math.round(weather.current.temp)}<span>\xB0C</span>`;

//     let weather_el = document.querySelector('.weather');
//     weather_el.innerText =
//       weather.current.weather[0].description.charAt(0).toUpperCase() +
//       weather.current.weather[0].description.slice(1);

//     let wind = document.querySelector('.wind ');
//     wind.innerText = `${weather.current.wind_speed}km/h`;

//     let humidity = document.querySelector('.humidity');
//     humidity.innerText = `${weather.current.humidity}%`;
//     let visibility = document.querySelector('.visibility');
//     visibility.innerText = `${weather.current.visibility}m`;
//   }

//   function dateBuilder(d) {
//     let months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];
//     let days = [
//       'Sunday',
//       'Monday',
//       'Tuesday',
//       'Wednesday',
//       'Thursday',
//       'Friday',
//       'Saturday',
//     ];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year} `;
//   }
// })();
(() => {
  const serverBaseUrl = 'http://localhost:10000';

  const fetchWeatherData = async (city) => {
    const weatherUrl = `${serverBaseUrl}/weather?city=${city}`;
    try {
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherData = await weatherResponse.json();
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  const getWeather = async (city) => {
    try {
      const weatherData = await fetchWeatherData(city);
      return weatherData;
    } catch (error) {
      console.error('Error getting weather data:', error);
      alert('Error fetching weather data: ' + error.message);
    }
  };

  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);

  function setQuery(evt) {
    if (evt.key === 'Enter') {
      getResults(searchbox.value);
      searchbox.value = '';
    }
  }

  function getResults(query) {
    getWeather(query).then(displayResults);
  }

  function displayResults(weather) {
    if (!weather) return;

    let city = document.querySelector('.city');
    city.innerText = `${weather.timezone}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let sunrise = document.querySelector('.sunrise');
    sunrise.innerText = `${new Date(weather.current.sunrise * 1000)
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .toLowerCase()}`;

    let sunset = document.querySelector('.sunset');
    sunset.innerText = `${new Date(weather.current.sunset * 1000)
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .toLowerCase()}`;

    let weatherIcon = document.querySelector('.image .weather-icon');
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png"/>`;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.current.temp)}<span>\xB0C</span>`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText =
      weather.current.weather[0].description.charAt(0).toUpperCase() +
      weather.current.weather[0].description.slice(1);

    let wind = document.querySelector('.wind');
    wind.innerText = `${weather.current.wind_speed} km/h`;

    let humidity = document.querySelector('.humidity');
    humidity.innerText = `${weather.current.humidity}%`;

    let visibility = document.querySelector('.visibility');
    visibility.innerText = `${weather.current.visibility} m`;
  }

  function dateBuilder(d) {
    let months = [
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
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
})();
