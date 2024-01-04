import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [weather, setWeather] = useState(null);

  // State to store loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to store any error from the fetch request
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

  // useEffect to call fetchWeather when the component mounts
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div>
 
    </div>
  );
}

export default App;
