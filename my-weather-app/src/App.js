import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import AllWeek from "./pages/allWeek/AllWeek";
function App() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=c665fbbea5a34e02aa594130240401&q=london&aqi=no"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return <div className="app">sdf</div>;
}

export default App;
