

import { useState } from "react";
import axios from "axios";
import "./weather.css";

export default function Weather() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey ="c6b5e739aa6acd1ece34f3de8c504336";

  const getCropSuggestion = (temp) => {
    if (temp < 20) {
      return "Cool weather. Suitable for Wheat and Peas.";
    } else if (temp < 30) {
      return "Moderate weather. Suitable for Rice, Maize, and Vegetables.";
    } else {
      return "Hot weather. Ensure proper irrigation. Suitable for Cotton and Millets.";
    }
  };

  const getWeather = async () => {
    if (!place.trim()) {
      setError("Please enter a place name.");
      setWeather(null);
      return;
    }

    try {
      setError("");

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${place.trim()}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError("Place not found. Please enter a valid city name.");
    }
  };

  return (
    <div className="weather-container">
      <h1>🌤 Weather Forecast</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>

          <h3>{Math.round(weather.main.temp)}°C</h3>

          <p>{weather.weather[0].description}</p>

          <div className="weather-details">
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
            <p>🌡 Feels Like: {Math.round(weather.main.feels_like)}°C</p>
            <p>📈 Max Temp: {Math.round(weather.main.temp_max)}°C</p>
            <p>📉 Min Temp: {Math.round(weather.main.temp_min)}°C</p>
          </div>

          <div className="crop-suggestion">
            <h4>🌾 Crop Management Suggestion</h4>
            <p>{getCropSuggestion(weather.main.temp)}</p>
          </div>
        </div>
      )}
    </div>
  );
}