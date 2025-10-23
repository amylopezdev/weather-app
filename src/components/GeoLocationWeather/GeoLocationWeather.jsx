import { Weather } from "../Weather/Weather";

export const GeoLocationWeather = ({ data }) => {
  return (
    <Weather data={data}/>
  );
};