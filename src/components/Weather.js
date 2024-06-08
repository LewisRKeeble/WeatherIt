import React, { useState } from "react";
import axios from "axios";
import { FaWind, FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FiSunrise, FiSunset } from "react-icons/fi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    setWeatherData(null);
    setError(null);
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Invalid City");
    }
  };

  return (
    <>
      <div className="app">
        <header>
          <h1 className="main-title">Weather It</h1>
        </header>

        {weatherData && (
          <div className="data-title">
            <h1 className="data-name">{weatherData.location.name}</h1>
            <h2 className="data-country">{weatherData.location.country}</h2>
          </div>
        )}
        <div className="input-container">
          <input
            className="main-input"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button className="button" aria-label="search" onClick={getWeather}>
            <FaSearch />
          </button>
        </div>
        {error && (
          <>
            <h1 className="error-tag">Invalid city! Try again</h1>
          </>
        )}
        {weatherData && (
          <>
            <main>
              <div className="data-img-container">
                <img
                  className="data-img"
                  src={weatherData.current.condition.icon}
                  alt="weather condition icon"
                />
                <p className="data-temp"> {weatherData.current.temp_c}°C</p>
              </div>
              <p className="data-condition">
                {weatherData.current.condition.text}
              </p>
              <div className="highlow-temp">
                <p>H:{weatherData.forecast.forecastday[0].day.maxtemp_c}°C</p>
                <p>L:{weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>
              </div>
              <div className="data-grid">
                <div className="data-astro">
                  <p className="data-wind">
                    <FaWind color="#38d8d0" />:{weatherData.current.wind_mph}mph
                  </p>
                  <p className="data-humidity">
                    <WiHumidity color="#38d8d0" />:
                    {weatherData.current.humidity}%
                  </p>
                </div>
                <div className="data-astro">
                  <p className="data-sunrise">
                    <FiSunrise color="#38d8d0" />:{" "}
                    {weatherData.forecast.forecastday[0].astro.sunrise}
                  </p>
                  <p className="data-sunset">
                    <FiSunset color="#38d8d0" />:{" "}
                    {weatherData.forecast.forecastday[0].astro.sunset}
                  </p>
                </div>
              </div>
            </main>
            <section>
              <h1 className="daily-title">Daily Forecast</h1>
              <hr />
              <div className="dailyweather-container">
                <div className="daily-card">
                  <h1>Today</h1>
                  <img
                    src={weatherData.forecast.forecastday[0].day.condition.icon}
                  />
                  <div className="daily-highlow">
                    <p>
                      H:{weatherData.forecast.forecastday[0].day.maxtemp_c}°C
                    </p>
                    <p>
                      L:{weatherData.forecast.forecastday[0].day.mintemp_c}°C
                    </p>
                  </div>
                </div>
                <div className="daily-card">
                  <h1>Tomorrow</h1>

                  <img
                    src={weatherData.forecast.forecastday[1].day.condition.icon}
                  />

                  <div className="daily-highlow">
                    <p>
                      H:{weatherData.forecast.forecastday[1].day.maxtemp_c}°C
                    </p>
                    <p>
                      L:{weatherData.forecast.forecastday[1].day.mintemp_c}°C
                    </p>
                  </div>
                </div>
                <div className="daily-card">
                  <h1>Overmorrow</h1>

                  <img
                    src={weatherData.forecast.forecastday[2].day.condition.icon}
                  />

                  <div className="daily-highlow">
                    <p>
                      H:{weatherData.forecast.forecastday[2].day.maxtemp_c}°C
                    </p>
                    <p>
                      L:{weatherData.forecast.forecastday[2].day.mintemp_c}°C
                    </p>
                  </div>
                </div>
              </div>
            </section>
            ;
          </>
        )}
      </div>
    </>
  );
};

export default Weather;
