import { useRecoilState } from "recoil";
import "./Home.css";
import { _weather, _location, _city } from "../../services/atom";

import React, { useRef, useEffect, useState } from "react";
import CardsHours from "../../compunents/cards-home-hours/CardsHoursByTime";
import CardForData from "../../compunents/homeCards/CardForData";
import ImgAndTemp from "../../compunents/imgAndTemp/ImgAndTemp";
import DateAndCity from "../../compunents/dateAndCity/DateAndCity";
import HomeIconsAndInput from "../../compunents/homeIconsAndInput/HomeIconsAndInput";
function Home() {
  const [weather, setWeather] = useRecoilState(_weather);
  const [location, setLocation] = useRecoilState(_location);
  const [city, setCity] = useRecoilState(_city);
  const [dayToDesplay, setDayToDesplay] = useState(1);
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="main-home">
      <HomeIconsAndInput />
      <DateAndCity />
      <ImgAndTemp />
      <CardForData />
      <CardsHours />
    </div>
  );
}

export default Home;
