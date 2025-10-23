import { useEffect, useState } from "react";

export const useFetchWeather = (lat, lon, city) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [geoLocationWeatherData, setGeoLocationWeatherData] =
    useState();
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [fiveDayForecastData, setFiveDayForecastData] = useState();

  const apiKey = import.meta.env.VITE_API_KEY;
  const geoLocationWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1fbf5912b1a3908549819348388404b4&units=imperial`;
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  const getWeather = async () => {
    if (!city && lat && lon) {
      setIsLoading(true);
      try {
        const geoLocationResponse = await fetch(geoLocationWeatherUrl);
        const geoLocationData = await geoLocationResponse.json();
        setGeoLocationWeatherData(geoLocationData);
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        );
        const forecastData = await forecastResponse.json();
        const dailyForecasts = forecastData?.list.filter(
          (item, index) => index % 8 === 0
        );
        setFiveDayForecastData(dailyForecasts);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (city) {
      try {
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();
        setCurrentWeatherData(data);
        const forecastResponse = await fetch(fiveDayForecastUrl);
        const forecastData = await forecastResponse.json();
        const dailyForecasts = forecastData?.list.filter(
          (item, index) => index % 8 === 0
        );
        setFiveDayForecastData(dailyForecasts);
        setIsError(false);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getWeather();
  }, [city, lat, lon]);

  return {
    isLoading,
    isError,
    geoLocationWeatherData,
    currentWeatherData,
    fiveDayForecastData,
  };
};
