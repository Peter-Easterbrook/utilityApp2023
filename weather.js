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
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let weatherIcon = document.querySelector('.current .weather-icon');
    weatherIcon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`;

    let sunrise = document.querySelector('.current .sunrise');
    sunrise.innerText = `Sunrise: ${new Date(
      weather.sys.sunrise * 1000
    ).toLocaleTimeString()}`;

    let sunset = document.querySelector('.current .sunset');
    sunset.innerText = `Sunset: ${new Date(
      weather.sys.sunset * 1000
    ).toLocaleTimeString()}`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>\xB0C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText =
      weather.weather[0].description.charAt(0).toUpperCase() +
      weather.weather[0].description.slice(1);

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}\xB0C / ${Math.round(
      weather.main.temp_max
    )}\xB0C`;

    let wind = document.querySelector('.current .wind ');
    wind.innerText = `Wind: ${weather.wind.speed}km/h`;

    let humidity = document.querySelector('.current .humidity');
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;
    let visibility = document.querySelector('.current .visibility');
    visibility.innerText = `Visibility: ${weather.visibility}m`;
    // }

    // function dateBuilder(d) {
    //   let months = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July',
    //     'August',
    //     'September',
    //     'October',
    //     'November',
    //     'December',
    //   ];
    //   let days = [
    //     'Sunday',
    //     'Monday',
    //     'Tuesday',
    //     'Wednesday',
    //     'Thursday',
    //     'Friday',
    //     'Saturday',
    //   ];

    //   let day = days[d.getDay()];
    //   let date = d.getDate();
    //   let month = months[d.getMonth()];
    //   let year = d.getFullYear();

    //   return `${day} ${date} ${month} `;
    // Add ${year} if you want the year to be displayed
  }
})();
