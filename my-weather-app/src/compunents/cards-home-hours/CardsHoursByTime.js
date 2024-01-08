import React, { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { _weather, _location, _city } from "../../services/atom";

import "./CardsHours.css";
function CardsHours() {
  const [dayToDesplay, setDayToDesplay] = useState(1);
  const [hourlyData, setHourlyData] = useState([]);
  const [city, setCity] = useRecoilState(_city);

  const handleTabClick = (tabName) => {
    setDayToDesplay(tabName);
  };

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=c665fbbea5a34e02aa594130240401&days=${dayToDesplay}&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        const hourlyForecasts = data.forecast.forecastday.flatMap((day) =>
          day.hour.map((hourData) => ({
            time: hourData.time,
            temperature: hourData.temp_c,
            icon: hourData.condition.icon,
          }))
        );
        setHourlyData(hourlyForecasts);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [dayToDesplay, city]);
  return (
    <div className="home-today-by-time">
      <div className="home-hours">
        <div
          className={`home-today ${
            dayToDesplay === 1 ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Today
        </div>
        <div
          className={`home-tomorrow ${
            dayToDesplay === 2 ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick(2)}
        >
          Tomorrow
        </div>
        <div
          className={`home-next7 ${
            dayToDesplay === 7 ? "active-tab" : "inactive-tab"
          }`}
          onClick={() => handleTabClick(7)}
        >
          Next 7 Days
        </div>
      </div>

      <div className="home-all-hours">
        {hourlyData.map((hour, index) => {
          const timeString = hour.time.split(" ")[1]; // Gets "13:00" from the "YYYY-MM-DD 13:00" format

          return (
            <div
              key={index}
              className={`home-hour ${
                hour.isCurrentTime ? "current-time" : ""
              }`}
            >
              <div className="home-hour-time">{timeString}</div>
              <img className="home-hour-icon" src={hour.icon} />
              <div className="home-hour-temp">{hour.temperature}°C</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardsHours;
