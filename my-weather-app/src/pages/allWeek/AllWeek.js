import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { _weather, _location, _city, _next7Days } from "../../services/atom";
import "./AllWeek.css";
import AllWeekButtonAndTitle from "../../compunents/AllWeekButtonAndTitle/AllWeekButtonAndTitle";
import AllWeekCards from "../../compunents/AllWeekCards/AllWeekCards";

function AllWeek() {
  const [city, setCity] = useRecoilState(_city);
  const [next7Days, setNext7Days] = useRecoilState(_next7Days);
  const [cardDayOpen, setCardDayOpen] = useState(null);

  const fetchAllWeekWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=c665fbbea5a34e02aa594130240401&days=7&q=${city}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.forecast && data.forecast.forecastday) {
        const next7DaysForecast = data.forecast.forecastday;
        setNext7Days(next7DaysForecast);
      } else {
        throw new Error("Forecast data is not available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllWeekWeather();
  }, [city]);
  return (
    <div className="allweek-main">
      <AllWeekButtonAndTitle />
      <AllWeekCards />
    </div>
  );
}

export default AllWeek;
