import { useContext } from "react";
import { UnitContext } from "../../context/UnitContext";
import "./UnitChange.css";

export const UnitChange = () => {
  const { unit, setUnit } = useContext(UnitContext);

  const capitalisedUnit = unit[0].toUpperCase() + unit.substring(1);

  return (
    <>
      <div className="unit-change-text">
        Results are shown in {capitalisedUnit}
      </div>
      <button
        onClick={() =>
          unit === "fahrenheit" ? setUnit("celsius") : setUnit("fahrenheit")
        }
        className="unit-change-btn"
      >
        Show results in {unit === "fahrenheit" ? "Celsius" : "Fahrenheit"}
      </button>
    </>
  );
};
