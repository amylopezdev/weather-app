import { useState } from "react";
import { CityContext } from "./context/CityContext";
import { UnitContext } from "./context/UnitContext";
import { Search } from "./components/Search/Search";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { UnitChange } from "./components/UnitChange/UnitChange";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("celsius");

  const converterFunc = (temp) => {
    if (typeof temp === "number") {
      if (unit === "fahrenheit") {
        return Math.round(temp);
      } else {
        const celTemp = (temp - 32) / 1.8;
        return Math.round(celTemp);
      }
    } else {
      return;
    }
  };

  return (
    <main>
      <h1 className="title">Weather</h1>
      <CityContext value={{ city, setCity }}>
        <Search />
        {city && (
          <UnitContext value={{ unit, setUnit, converterFunc }}>
            <CurrentWeather />
            <UnitChange />
          </UnitContext>
        )}
      </CityContext>
    </main>
  );
};

export default App;
