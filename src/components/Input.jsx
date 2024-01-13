import React, { useState } from "react";

const Input = ({ handleSubmit }) =>
{
    const [cityName, setCityName] = useState("");
    // handle city name change
    const handleCityChange = (e) =>
    {
        setCityName(e.target.value)
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Enter City Name" value={cityName} onChange={handleCityChange} />
            <button className="search-btn" onClick={() =>
            {
                handleSubmit(cityName);
                setCityName("")
            }}>Submit</button>
        </div>
    )
}

export default Input