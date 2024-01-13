import React from "react";

const WeatherDetails = ({ weatherDetails, isTempCelcius, weatherIcons }) =>
{
    return (
        <div className="current-weather">
            {
                weatherDetails && <table>
                    <thead>
                        <tr>
                            <th>Current Temperature</th>
                            <th>Minimum Temperature</th>
                            <th>Maximum  Temperature</th>
                            <th>Humidity</th>
                            <th>Wind Speed</th>
                            <th>Wind Direction</th>
                            <th>Description</th>
                            <th>Icon</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>{weatherDetails.currentTemp}{isTempCelcius ? <>&deg;C</> : <>&deg;F</>}</td>
                            <td>{weatherDetails.minTemp}{isTempCelcius ? <>&deg;C</> : <>&deg;F</>}</td>
                            <td>{weatherDetails.maxTemp}{isTempCelcius ? <>&deg;C</> : <>&deg;F</>}</td>
                            <td>{weatherDetails.humidity}</td>
                            <td>{weatherDetails.windSpeed}</td>
                            <td>{weatherDetails.windDirection}</td>
                            <td>{weatherDetails.description}</td>
                            <td><img src={weatherIcons[weatherDetails.icon]} alt="Weather Icon" /></td>
                        </tr>
                    </tbody>
                </table>
            }

        </div>
    )
}

export default WeatherDetails;