import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vitest, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { GeoLocationWeather } from "../GeoLocationWeather";

vitest.mock("../../Weather/Weather", () => ({
  Weather: vitest.fn(({ data }) => (
    <div data-testid="mock-weather">Mock Weather: {data?.city}</div>
  )),
}));

describe("GeoLocationWeather", () => {
  afterEach(() => cleanup());

  it("renders the Weather component", () => {
    const mockData = { city: "Berlin", temp: 20 };

    render(<GeoLocationWeather data={mockData} />);
    expect(screen.getByTestId("mock-weather")).toBeInTheDocument();
  });

  it("passes the correct data to Weather", () => {
    const mockData = { city: "Paris", temp: 25 };

    render(<GeoLocationWeather data={mockData} />);

    expect(screen.getByText(/mock weather: paris/i)).toBeInTheDocument();
  });
});
