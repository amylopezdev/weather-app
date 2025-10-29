import { useState } from "react";
import { CityContext } from "./context/CityContext";
import { UnitContext } from "./context/UnitContext";
import { useGetCoordinates } from "./hooks/useGetCoordinates";
import { useFetchWeather } from "./hooks/useFetchWeather";
import { Loading } from "./components/Loading/Loading";
import { Error } from "./components/Error/Error";
import { Search } from "./components/Search/Search";
import { GeoLocationWeather } from "./components/GeoLocationWeather/GeoLocationWeather";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { FiveDayForecast } from "./components/FiveDayForecast/FiveDayForecast";
import { UnitChange } from "./components/UnitChange/UnitChange";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("celsius");

  const { getCoordinates, lat, lon } = useGetCoordinates();

  const {
    isLoading,
    isError,
    geoLocationWeatherData,
    currentWeatherData,
    fiveDayForecastData,
  } = useFetchWeather(lat, lon, city);

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
        <br />
        <Search />
        {!isLoading && !isError && !city && (
          <>
            <button className="location-btn" onClick={() => getCoordinates()}>
              {lat ? "Refresh my location" : "Use my location"}
            </button>
          </>
        )}
         </CityContext>
        <UnitContext value={{ unit, setUnit, tempConverter }}>
          {isError && <Error message={currentWeatherData?.message} />}
          {isLoading && <Loading />}
          {!isError &&
            !isLoading &&
            geoLocationWeatherData &&
            !currentWeatherData && (
              <GeoLocationWeather data={geoLocationWeatherData} />
            )}
          {!isError && !isLoading && currentWeatherData && (
            <CurrentWeather data={currentWeatherData} />
          )}
          {!isError && !isLoading && fiveDayForecastData && (
            <>
              <FiveDayForecast data={fiveDayForecastData} />
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
    </main>
  );
};

export default App;
