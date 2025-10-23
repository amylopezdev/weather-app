import { useEffect, useState } from "react";

export const useFetchWeather = (city, currWeatherUrl, fiveDayForecastUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [fiveDayForecastData, setFiveDayForecastData] = useState();

  const getWeather = async () => {
    if (city === "") {
      return;
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(currWeatherUrl);
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
  }, [city]);

  return { isLoading, isError, currentWeatherData, fiveDayForecastData };
};
