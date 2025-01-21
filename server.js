// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

const API_CONFIG = {
  geoUrl: 'https://api.openweathermap.org/geo/1.0/direct',
  weatherUrl: 'https://api.openweathermap.org/data/3.0/onecall',
  units: 'metric',
};

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city?.trim()) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const fetch = (await import('node-fetch')).default;

    // Get coordinates
    const geoUrl = new URL(API_CONFIG.geoUrl);
    geoUrl.searchParams.set('q', city);
    geoUrl.searchParams.set('limit', '1');
    geoUrl.searchParams.set('appid', API_KEY);

    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) {
      throw new Error(`Geocoding API error: ${geoResponse.statusText}`);
    }

    const geoData = await geoResponse.json();
    if (!geoData?.length) {
      return res.status(404).json({ error: 'City not found' });
    }

    // Get weather data
    const { lat, lon } = geoData[0];
    const weatherUrl = new URL(API_CONFIG.weatherUrl);
    weatherUrl.searchParams.set('lat', lat);
    weatherUrl.searchParams.set('lon', lon);
    weatherUrl.searchParams.set('units', API_CONFIG.units);
    weatherUrl.searchParams.set('appid', API_KEY);

    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.statusText}`);
    }

    const weatherData = await weatherResponse.json();
    res.json(weatherData);
  } catch (error) {
    console.error('Weather data fetch error:', error);
    res.status(500).json({
      error: 'Error fetching weather data',
      details: error.message,
    });
  }
});

// Default route to serve the index.html for your app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
