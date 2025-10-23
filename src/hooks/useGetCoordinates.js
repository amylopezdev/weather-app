import { useState } from "react";

export const useGetCoordinates = () => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  const getCoordinates = () => {
    const success = (position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  return { getCoordinates, lat, lon };
};
