import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { weatherIcons } from "./iconData";
import Input from "./components/Input";
import WeatherDetails from "./components/WeatherDetails";
import WeatherForecast from "./components/WeatherForecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App()
{


  const [weatherDetails, setWeatherDetails] = useState(null);
  const [foreCastDetails, setForecastDetails] = useState(null);
  const [isTempCelcius, setIsTempCelcius] = useState(true)
  const [realWeather, setRealWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)
  let weatherData = {};


  // convert tempreature into celcius and farenheit

  const convertTempreature = (realWeather, forecastWeather) =>
  {
    fetchTempreature(realWeather, forecastWeather)

  }





  const fetchTempreature = (realWeather, forecastWeather) =>
  {

    setIsTempCelcius(!isTempCelcius)
    let currentTempCel = (realWeather.data.main.temp - 273.15).toFixed(0);
    let minTempCel = (realWeather.data.main.temp_max - 273.15).toFixed(0);
    let maxTempCel = (realWeather.data.main.temp_max - 273.15).toFixed(0);

    let currentTempFar = (currentTempCel * 9 / 5) + 32;
    let minTempFar = (minTempCel * 9 / 5) + 32;
    let maxTempFar = (maxTempCel * 9 / 5) + 32;
    console.log("isTempCelcius", isTempCelcius)
    weatherData = {
      ...weatherData,
      currentTemp: isTempCelcius ? currentTempCel : currentTempFar,
      minTemp: isTempCelcius ? minTempCel : minTempFar,
      maxTemp: isTempCelcius ? maxTempCel : maxTempFar,
      humidity: realWeather.data.main.humidity,
      windSpeed: realWeather.data.wind.speed,
      windDirection: realWeather.data.wind.deg,
      description: realWeather.data.weather[0].description,
      icon: realWeather.data.weather[0].icon,
    }

    setWeatherDetails(weatherData)



    const uniqueDates = new Set();
    const filteredForecast = forecastWeather.data.list.filter(item =>
    {
      const todayDate = new Date(item.dt * 1000).toLocaleDateString('en-US');
      if (!uniqueDates.has(todayDate)) {
        uniqueDates.add(todayDate);
        return true;
      }
      return false;
    });

    setForecastDetails(filteredForecast.slice(0, 5));
  }

  const handleSubmit = async (cityName) =>
  {
    try {
      if (cityName) {
        setIsTempCelcius(true)
        const realWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&APPID=2e88c1fb66dc3131ad9f98262754e88b`);

        const forecastWeather = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName},IN&APPID=2e88c1fb66dc3131ad9f98262754e88b`);

        fetchTempreature(realWeather, forecastWeather);
        setRealWeather(realWeather);
        setForecastWeather(forecastWeather)
      }

    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {
        position: 'top-right',
        autoClose: 2000, // Set the time (in milliseconds) the toast should be displayed
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

  }

  const handleDateFormat = (dt) =>
  {
    const timestamp = dt;
    const date = new Date(timestamp * 1000);

    const formattedDate = date.toLocaleDateString('en-US');
    return formattedDate
  }

  return (
    <div className="App">
      <ToastContainer />
      <h1>Weather Forecast App</h1>
      <div className="container">
        <button className="temp-converter" onClick={() =>
        {
          convertTempreature(realWeather, forecastWeather)
        }}>Convert Into Farenheit</button>
        <Input
          handleSubmit={handleSubmit}
        />
        <WeatherDetails
          weatherDetails={weatherDetails}
          isTempCelcius={isTempCelcius}
          weatherIcons={weatherIcons}
        />

        <WeatherForecast
          foreCastDetails={foreCastDetails}
          isTempCelcius={isTempCelcius}
          weatherIcons={weatherIcons}
          handleDateFormat={handleDateFormat}
        />
      </div>
    </div >
  );
}

export default App;
