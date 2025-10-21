import { useContext } from "react";
import { CityContext } from "../../context/CityContext";
import { useFetchData } from "../../hooks/useFetchData";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import "./CurrentWeather.css";

export const CurrentWeather = () => {
  const { city } = useContext(CityContext);

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  const { isLoading, isError, data } = useFetchData(city, apiUrl);

  if (isLoading)
    return <Loading message="Loading current weather conditions" />;
  if (isError) return <Error />;
  return (
    <section className="current-weather">
      <h2>
        <span>Results for</span>
        <br />
        {data?.name}, {data?.sys?.country}
      </h2>
      <ul>
        <li className="main-temp">{data?.main?.temp}ºF</li>
        <li>
          High: {data?.main?.temp_max}º | Low: {data?.main?.temp_min}º
        </li>
        <li> Feels like: {data?.main?.feels_like}º</li>
        <li> {data?.main?.humidity}% humidity</li>
      </ul>
    </section>
  );
};
