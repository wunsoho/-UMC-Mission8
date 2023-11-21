import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const API_KEY = 'b5d354edcd026aa5c891c3ae76f15134';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', 
        },
      });
      const temp1 = (response.data.main.temp - 32) * (5 / 9);
      setWeatherData({
        ...response.data,
        main: {
          ...response.data.main,
          temp: temp1,
        },
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      getWeatherData();
    }
  }

  return (
    <div className = "cityName">
      <input
        type="text"
        placeholder="도시를 입력하세요"
        value={city}
        onChange={handleCityChange}
        onKeyPress={handleKeyPress}
      />

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp.toFixed(0)}°C</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
