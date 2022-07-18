import axios from "axios"
import { useState, useEffect } from "react";

export const CountryDisplay = ({ country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
         .then(response => setWeather(response.data))
  }, [])
  
  if (weather.length === 0) {
    return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area} </div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
    </div>
  )
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area} </div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>Weather in {country.capital}</h3>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}/>
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  );
};
