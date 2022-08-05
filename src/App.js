import "./App.css";
import Axios from "axios";
import { useState } from "react";

function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(0);

  const searchWeather = () => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=eb3adb28b4bca03ba85aa843cb2ad7f9`
    ).then((res) => {
      setWeather({
        name: res.data.name,
        data: res.data.main,
        temp: res.data.main.temp.toFixed(),
        description: res.data.weather[0].main,
        feels: res.data.main.feels_like.toFixed(),
        humidity: res.data.main.humidity,
        wind: res.data.wind.speed.toFixed()
      });
      // console.log(res.data.name);
    });
  };

  const keyPress = (event) => {
    if (event.key === "Enter") {
      searchWeather();
      setCityName("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          className="searchInput"
          value={cityName}
          onKeyPress={keyPress}
          onChange={(event) => setCityName(event.target.value)}
          type="text"
          placeholder="Enter Location"
        />
        <button className="searchButton" onClick={searchWeather}>
          Go!
        </button>
      </div>
      {weather.data ? <h2 className="weatherName">{weather.name}</h2> : null}
      {weather.data ? <p className="weatherTemp">{weather.temp}°C</p> : null}
      {weather.data ? (
        <p className="weatherDesc">{weather.description}</p>
      ) : null}

      {weather.data ? (
        <div className="bottomInfo">
          <div>
            {weather.data ? (
              <h2 className="bottomData">{weather.feels}°C</h2>
            ) : null}
            <p className="bottomTitle">Feels Like</p>
          </div>
          <div>
            {weather.data ? (
              <h2 className="bottomData">{weather.humidity}%</h2>
            ) : null}
            <p className="bottomTitle">Humidity</p>
          </div>
          <div>
            {weather.data ? (
              <h2 className="bottomData">{weather.wind}MPH</h2>
            ) : null}
            <p className="bottomTitle">Wind Speed</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
