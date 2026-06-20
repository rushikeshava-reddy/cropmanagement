import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [crops, setCrops] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  // 🔐 AUTH HEADER (IMPORTANT)
  const authHeader = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  // 🌾 FETCH CROPS (USER ONLY)
  const fetchCrops = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/crops",
        authHeader
      );

      setCrops(res.data);

      // 🌱 latest GROWING crop only (better logic)
      const latestCrop = res.data
        .filter((c) => c.cropStatus === "Growing")
        .slice(-1)[0];

      const place = latestCrop?.cropPlace?.trim();

      if (place && place.length > 2) {
        fetchWeather(place);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🌦 WEATHER API
  const fetchWeather = async (place) => {
    try {
      setLoadingWeather(true);

      const apiKey = "c6b5e739aa6acd1ece34f3de8c504336";

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: place,
            appid: apiKey,
            units: "metric",
          },
        }
      );

      setWeather(response.data);
    } catch (error) {
      console.log("Weather error:", error.response?.data || error.message);
      setWeather(null);
    } finally {
      setLoadingWeather(false);
    }
  };

  // 📊 STATS
  const totalCrops = crops.length;

  const activeCrops = crops.filter(
    (crop) => crop.cropStatus === "Growing"
  ).length;

  const harvested = crops.filter(
    (crop) => crop.cropStatus === "Harvested"
  ).length;

  const totalLand = crops.reduce(
    (sum, crop) => sum + Number(crop.cropArea || 0),
    0
  );

  return (
    <div>

      <h2 className="mb-4">🏠 Smart Farming Dashboard</h2>

      {/* ================= STATS ================= */}
      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{totalCrops}</h3>
              <p>Total Crops</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{activeCrops}</h3>
              <p>Growing Crops</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{harvested}</h3>
              <p>Harvested Crops</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{totalLand}</h3>
              <p>Total Acres</p>
            </div>
          </div>
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="card shadow mb-4">
        <div className="card-header bg-success text-white">
          Crop Overview
        </div>

        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Area</th>
                <th>Status</th>
                <th>Place</th>
              </tr>
            </thead>

            <tbody>
              {crops.map((crop) => (
                <tr key={crop._id}>
                  <td>{crop.cropName}</td>
                  <td>{crop.cropArea} Acres</td>
                  <td>{crop.cropStatus}</td>
                  <td>{crop.cropPlace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">

        {/* SUMMARY */}
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header bg-warning">
              Crop Summary
            </div>

            <div className="card-body">
              <h6>Total Crops : {totalCrops}</h6>
              <h6>Growing : {activeCrops}</h6>
              <h6>Harvested : {harvested}</h6>
            </div>
          </div>
        </div>

        {/* WEATHER */}
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header bg-info text-white">
              🌦️ Weather (Auto from Latest Growing Crop)
            </div>

            <div className="card-body">

              {crops.length > 0 && (
                <p>
                  📍 Location:{" "}
                  <b>
                    {
                      crops
                        .filter(c => c.cropStatus === "Growing")
                        .slice(-1)[0]?.cropPlace
                    }
                  </b>
                </p>
              )}

              {loadingWeather ? (
                <p>Loading weather...</p>
              ) : weather?.main ? (
                <>
                  <h6>🌡 Temperature: {weather.main.temp}°C</h6>
                  <h6>💧 Humidity: {weather.main.humidity}%</h6>
                  <h6>🌥 Condition: {weather.weather?.[0]?.description}</h6>
                </>
              ) : (
                <p>No weather data available</p>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}