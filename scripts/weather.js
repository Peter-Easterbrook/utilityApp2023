(() => {
  //Weather app
  const api = {
    key: 'e8b8edf5374f56949a098e6695b3f908',
    base: 'https://api.openweathermap.org/data/2.5/',
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
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults);
  }

  function displayResults(weather) {
    let city = document.querySelector(' .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(' .date');
    date.innerText = dateBuilder(now);

    let sunrise = document.querySelector(' .sunrise');
    sunrise.innerText = `${new Date(
      weather.sys.sunrise * 1000
    ).toLocaleTimeString()}`;

    let sunset = document.querySelector('.sunset');
    sunset.innerText = `${new Date(
      weather.sys.sunset * 1000
    ).toLocaleTimeString()}`;

    let weatherIcon = document.querySelector('.image .weather-icon');
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png"/>`;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>\xB0C</span>`;

    let weather_el = document.querySelector('.weather');
    weather_el.innerText =
      weather.weather[0].description.charAt(0).toUpperCase() +
      weather.weather[0].description.slice(1);

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}\xB0C / ${Math.round(
      weather.main.temp_max
    )}\xB0C`;

    let wind = document.querySelector('.wind ');
    wind.innerText = `Wind: ${weather.wind.speed}km/h`;

    let humidity = document.querySelector('.humidity');
    humidity.innerText = `${weather.main.humidity}%`;
    let visibility = document.querySelector('.visibility');
    visibility.innerText = `${weather.visibility}m`;
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

    return `${day} ${date} ${month} ${year} `;
  }
})();
