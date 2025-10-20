import { useEffect, useState } from "react";

export const useFetchData = (city, url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();

  const getWeather = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  return { isLoading, isError, data };
};
