import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import AllWeek from "./pages/allWeek/AllWeek";
import { Link, Route, Routes, HashRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { _weather, _location, _city } from "./services/atom";
function App() {
  const [weather, setWeather] = useRecoilState(_weather);
  const [location, setLocation] = useRecoilState(_location);
  const [city, setCity] = useRecoilState(_city);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=c665fbbea5a34e02aa594130240401&q=${city}&aqi=no`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data.current);
      setLocation(data.location);
      // console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(location);
  // console.log(weather);

  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allweek" element={<AllWeek />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
