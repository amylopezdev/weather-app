import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vitest, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { CityContext } from "../../../context/CityContext";
import { Search } from "../Search";

describe("Search", () => {
  afterEach(() => cleanup());

  it("renders input, label, and button", () => {
    render(
      <CityContext.Provider value={{ setCity: vitest.fn() }}>
        <Search />
      </CityContext.Provider>
    );
    expect(screen.getByLabelText(/search a city name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("updates input value when user types", async () => {
    const user = userEvent.setup();
    render(
      <CityContext.Provider value={{ setCity: vitest.fn() }}>
        <Search />
      </CityContext.Provider>
    );
    const input = screen.getByLabelText(/search a city name/i);
    await user.type(input, "London");
    expect(input).toHaveValue("London");
  });

  it("sets city with the input value on submit", async () => {
    const user = userEvent.setup();
    const mockSetCity = vitest.fn();
    render(
      <CityContext.Provider value={{ setCity: mockSetCity }}>
        <Search />
      </CityContext.Provider>
    );
    const input = screen.getByLabelText(/search a city name/i);
    const button = screen.getByRole("button", { name: /search/i });
    await user.type(input, "Dakar");
    await user.click(button);
    expect(mockSetCity).toHaveBeenCalledWith("Dakar");
  });
});
