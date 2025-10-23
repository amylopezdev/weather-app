import { DailyForecast } from "../DailyForecast/DailyForecast";
import "./FiveDayForecast.css";

export const FiveDayForecast = ({ data }) => {
  return (
    <section className="five-day-forecast">
      <h2>Five Day Forecast</h2>
      <ul>
        {data?.map((forecastItem) => (
          <DailyForecast key={forecastItem.dt} forecastData={forecastItem} />
        ))}
      </ul>
    </section>
  );
};
