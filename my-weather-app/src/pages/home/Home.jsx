import { useRecoilState } from "recoil";
import "./Home.css";
import { _weather, _location, _city } from "../../services/atom";

import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardsHours from "../../compunents/cards-home-hours/CardsHoursByTime";
import CardForData from "../../compunents/homeCards/CardForData";

function Home() {
  const [weather, setWeather] = useRecoilState(_weather);
  const [location, setLocation] = useRecoilState(_location);
  const [city, setCity] = useRecoilState(_city);
  const [dayToDesplay, setDayToDesplay] = useState(1);
  const [serchIsOpen, setSerchIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const navigateToAllWeek = () => {
    navigate("/allweek");
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCity(value);
  };
  const formatDateString = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);

    if (isNaN(date)) {
      console.error("Invalid date string:", dateString);
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", options);
  };

  const handleTabClick = (tabName) => {
    setDayToDesplay(tabName);
  };
  const hendlleCloseSerch = () => {
    setSerchIsOpen(!serchIsOpen);
  };
  return (
    <div className="main-home">
      <div className="home-icons">
        <div className="home-serch-icon" onClick={hendlleCloseSerch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M14.7956 14.5835L16.4926 16.2805M12.6035 12.8157C10.0651 15.3541 5.94957 15.3541 3.41116 12.8157C0.872753 10.2773 0.872753 6.16171 3.41116 3.6233C5.94957 1.0849 10.0651 1.0849 12.6035 3.6233C15.142 6.16171 15.142 10.2773 12.6035 12.8157Z"
              stroke="black"
              strokeWidth="1.6"
              strokeinecap="round"
            />
          </svg>
        </div>
        {serchIsOpen ? (
          <div>
            <input
              className="home-serchCity"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search city"
            />{" "}
          </div>
        ) : (
          ""
        )}
        <div className="home-menu-icon" onClick={navigateToAllWeek}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path d="M4 0H13V2H4V0Z" fill="#1B1919" />
            <path d="M1 12H10V14H1V12Z" fill="#1B1919" />
            <path d="M0 6H14V8H0V6Z" fill="#1B1919" />
          </svg>
        </div>
      </div>

      <div className="home-location">
        {location.name},<span> {location.country}</span>
      </div>
      <div className="home-date">
        {" "}
        {location && location.localtime
          ? formatDateString(location.localtime)
          : "Loading date..."}
      </div>
      <div className="img-and-temp">
        <div className="home-img">
          {weather?.condition?.icon && (
            <img src={weather.condition.icon} alt="Weather Icon" />
          )}
        </div>

        <div className="home-temp-rigth">
          <div>
            <div className="home-temp">
              {weather.temp_c} <span className="c">° C</span>
            </div>
            <div className="home-condition">{weather?.condition?.text}</div>
          </div>
        </div>
      </div>
      <CardForData />
      <CardsHours />
    </div>
  );
}

export default Home;
