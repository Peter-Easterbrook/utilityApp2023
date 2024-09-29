// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send('City is required');
  }

  try {
    const fetch = (await import('node-fetch')).default;

    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      return res.status(404).send('City not found');
    }

    const { lat, lon } = geoData[0];
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const weatherData = await weatherResponse.json();

    res.json(weatherData);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

// Default route to serve the index.html for your app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
