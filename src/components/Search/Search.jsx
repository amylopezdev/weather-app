import { useState, useContext } from "react";
import { CityContext } from "../../context/CityContext";
import "./Search.css";

export const Search = () => {
  const { setCity } = useContext(CityContext);
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(searchInput);
  };

  return (
    <section className="search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search a city name</label>
        <div className="search-bar">
          <input
            id="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </div>
      </form>
    </section>
  );
};
