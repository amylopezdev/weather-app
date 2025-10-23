import { useContext } from "react";
import { UnitContext } from "../../context/UnitContext";
import "./CurrentWeather.css";

export const CurrentWeather = ({ data }) => {
  const { unit, tempConverter } = useContext(UnitContext);
  return (
    <section className="current-weather">
      <h2>
        Results for <br />
        {data?.name}, {data?.sys?.country}
      </h2>
      <div>
        {" "}
        {new Date(data.dt * 1000).toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <ul>
        <li className="main-temp">
          {tempConverter(data?.main?.temp)}
          <span>{unit === "celsius" ? "ºC" : "ºF"}</span>
        </li>

        {data.weather.map((weatherItem) => {
          return (
            <li key={data.dt} className="description">
              {weatherItem.description}
            </li>
          );
        })}
        <li>
          High: {tempConverter(data?.main?.temp_max)}º | Low:{" "}
          {tempConverter(data?.main?.temp_min)}º
        </li>
        <li> Feels like: {tempConverter(data?.main?.feels_like)}º</li>
        <li>Humidity: {data?.main?.humidity}%</li>
      </ul>
    </section>
  );
};
