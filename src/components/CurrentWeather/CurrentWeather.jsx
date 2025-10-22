import { useContext } from "react";
import { UnitContext } from "../../context/UnitContext";
import "./CurrentWeather.css";

export const CurrentWeather = ({ data }) => {
  const { unit, converterFunc } = useContext(UnitContext);
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
