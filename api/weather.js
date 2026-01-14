// api/weather.js
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

const API_CONFIG = {
  geoUrl: 'https://api.openweathermap.org/geo/1.0/direct',
  weatherUrl: 'https://api.openweathermap.org/data/3.0/onecall',
  units: 'metric',
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { city } = req.query;

  if (!city?.trim()) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Use dynamic import for node-fetch
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
    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Weather data fetch error:', error);
    res.status(500).json({
      error: 'Error fetching weather data',
      details: error.message,
    });
  }
}
