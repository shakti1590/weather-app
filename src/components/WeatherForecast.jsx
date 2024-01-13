import React from "react";

const WeatherForecast = ({ foreCastDetails, isTempCelcius, weatherIcons, handleDateFormat }) =>
{
    return (
        <div className="forecast-weather">
            {
                foreCastDetails && <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Average temperature</th>
                            <th>Description</th>
                            <th>icon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foreCastDetails.map((data, index) =>
                            {
                                return (
                                    <tr key={index}>
                                        <td>{handleDateFormat(data.dt)}</td>
                                        <td>{isTempCelcius ? (data.main.temp - 273.15).toFixed(0) : ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(0)}{isTempCelcius ? <>&deg;C</> : <>&deg;F</>}</td>
                                        <td>{data.weather[0].description}</td>
                                        <td><img src={weatherIcons[data.weather[0].icon]} alt="Forecast Weather" /></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            }
        </div>
    )
}

export default WeatherForecast;