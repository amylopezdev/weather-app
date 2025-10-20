import { useState } from "react";
import { CityContext } from "./context/CityContext";
import { Search } from "./components/Search/Search";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";

const App = () => {
  const [city, setCity] = useState("");

  return (
    <main>
      <h1 className="title">Weather</h1>
      <CityContext value={{ city, setCity }}>
        <Search />
        {city && <CurrentWeather />}
      </CityContext>
    </main>
  );
};

export default App;
