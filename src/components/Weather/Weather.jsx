import { useContext } from "react";
import { UnitContext } from "../../context/UnitContext";
import "./Weather.css";

export const Weather = ({ data }) => {
  const { unit, tempConverter } = useContext(UnitContext);
  return (
    <section className="weather">
      <h2>
        Results for <br />
        {data?.name}, {data?.sys?.country}
      </h2>
      <div>
        {new Date(data.dt * 1000).toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div className="main-temp">
        {tempConverter(data?.main?.temp)}
        <span>{unit === "celsius" ? "ºC" : "ºF"}</span>
      </div>

      {data?.weather?.map((weatherItem) => {
        return (
          <div key={data.dt} className="description">
            {weatherItem.description}
          </div>
        );
      })}
      <div>
        High: {tempConverter(data?.main?.temp_max)}º | Low:{" "}
        {tempConverter(data?.main?.temp_min)}º
      </div>
      <div> Feels like: {tempConverter(data?.main?.feels_like)}º</div>
      <div>Humidity: {data?.main?.humidity}%</div>
    </section>
  );
};
