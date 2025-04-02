import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch current weather data
            const weatherResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3537a05f6f1c693800dd1823a6855d56&units=metric`
            );//NOTE: PLEASE USE YOUR OWN API KEY, THIS IS A DUMMY API KEY

            if (!weatherResponse.ok) {
              throw new Error("Failed to fetch current weather data");
            }

            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);

            // Fetch future weather data
            const forecastResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=3537a05f6f1c693800dd1823a6855d56&units=metric`
            );

            if (!forecastResponse.ok) {
              throw new Error("Failed to fetch forecast data");
            }

            const forecastData = await forecastResponse.json();
            setForecastData(forecastData);
          });
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      <Main weatherData={weatherData} forecastData={forecastData} error={error} />
    </>
  );
};

export default App;
