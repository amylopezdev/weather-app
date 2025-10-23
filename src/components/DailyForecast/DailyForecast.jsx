import { useContext } from "react";
import { UnitContext } from "../../context/UnitContext";
import "./DailyForecast.css";

export const DailyForecast = ({ forecastData }) => {
  const { tempConverter } = useContext(UnitContext);
  return (
    <li className="daily-forecast">
      <div>
        {new Date(forecastData.dt * 1000).toLocaleDateString("en-GB", {
          weekday: "long",
        })}
      </div>
      <div className="main-temp">
        {tempConverter(forecastData?.main?.temp)}º
      </div>
      {forecastData.weather.map((weatherItem) => {
        return (
          <div key={forecastData.dt} className="description">
            {weatherItem.main}
          </div>
        );
      })}
      <div>High: {tempConverter(forecastData?.main?.temp_max)}º</div>
      <div>
        Low:
        {tempConverter(forecastData?.main?.temp_min)}º
      </div>
    </li>
  );
};
