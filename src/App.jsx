import { useState } from "react";
import { CityContext } from "./context/CityContext";
import { UnitContext } from "./context/UnitContext";
import { useFetchWeather } from "./hooks/useFetchWeather";
import { Loading } from "./components/Loading/Loading";
import { Error } from "./components/Error/Error";
import { Search } from "./components/Search/Search";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { FiveDayForecast } from "./components/FiveDayForecast/FiveDayForecast";
import { UnitChange } from "./components/UnitChange/UnitChange";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("celsius");

  const apiKey = import.meta.env.VITE_API_KEY;
  const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const fiveDayForecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  const { isLoading, isError, currentWeatherData, fiveDayForecastData } =
    useFetchWeather(city, currentWeatherApiUrl, fiveDayForecastApiUrl);

  const tempConverter = (temp) => {
    if (typeof temp === "number") {
      if (unit === "fahrenheit") {
        return Math.round(temp);
      } else {
        const celTemp = (temp - 32) / 1.8;
        return Math.round(celTemp);
      }
    } else {
      return;
    }
  };

  return (
    <main>
      <h1 className="title">Weather</h1>
      <CityContext value={{ city, setCity }}>
        <Search />
        <UnitContext value={{ unit, setUnit, tempConverter }}>
          {isError && <Error message={currentWeatherData.message} />}
          {isLoading && <Loading />}
          {!isError && !isLoading && currentWeatherData && (
            <CurrentWeather data={currentWeatherData} />
          )}
          {!isError && !isLoading && fiveDayForecastData && (
            <>
              <FiveDayForecast data={fiveDayForecastData}/>
            </>
          )}
          {!isError &&
            !isLoading &&
            (currentWeatherData || fiveDayForecastData) && (
              <>
                <UnitChange />
              </>
            )}
          {!isLoading && city && (
            <button
              className="clear-btn"
              onClick={() => window.location.reload()}
            >
              Clear results
            </button>
          )}
        </UnitContext>
      </CityContext>
    </main>
  );
};

export default App;
