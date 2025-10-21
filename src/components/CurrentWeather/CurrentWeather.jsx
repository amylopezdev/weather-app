import { useContext } from "react";
import { CityContext } from "../../context/CityContext";
import { UnitContext } from "../../context/UnitContext";
import { useFetchData } from "../../hooks/useFetchData";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import "./CurrentWeather.css";

export const CurrentWeather = () => {
  const { city } = useContext(CityContext);
  const { unit, converterFunc } = useContext(UnitContext);

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  const { isLoading, isError, data } = useFetchData(city, apiUrl);

  const errorStatus = data?.cod.toString().charAt(0) === "4";

  if (isLoading)
    return <Loading message="Loading Current Weather Conditions..." />;
  if (isError || errorStatus) return <Error message={data.message} />;
  return (
    <section className="current-weather">
      <h2>
        <span>Results for</span>
        <br />
        {data?.name}, {data?.sys?.country}
      </h2>
      <ul>
        <li className="main-temp">
          {converterFunc(data?.main?.temp)}
          <span>{unit === "celsius" ? "ºC" : "ºF"}</span>
        </li>
        <li>
          High: {converterFunc(data?.main?.temp_max)}º | Low:{" "}
          {converterFunc(data?.main?.temp_min)}º
        </li>
        <li> Feels like: {converterFunc(data?.main?.feels_like)}º</li>
        <li>Humidity: {data?.main?.humidity}%</li>
      </ul>
    </section>
  );
};
