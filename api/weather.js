const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

module.exports = async (req, res) => {
  // Security headers
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  // Force HTTPS
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.status(403).json({ error: 'Please use HTTPS' });
  }

  // ...existing code...

  try {
    const fetch = (await import('node-fetch')).default;
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${API_KEY}`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Weather App',
        },
      }
    );

    // ...existing code...
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Error fetching weather data' });
  }
};
