import { useState, useContext } from "react";
import { CityContext } from "../../context/CityContext";
import "./Search.css";

export const Search = () => {
  const { setCity } = useContext(CityContext);
  const [searchInput, setSearchInput] = useState("");
  const [infoText, setInfoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      setCity(searchInput);
      setInfoText()
    }
    if (!searchInput) {
      setInfoText("Please type something");
    }
  };

  return (
    <section className="search">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search a city name</label>
        <div className="info-text">{infoText}</div>
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
