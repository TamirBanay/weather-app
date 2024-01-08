import React from "react";
import "./DateAndCity.css";
import { useRecoilState } from "recoil";
import { _weather, _location, _city } from "../../services/atom";

function DateAndCity() {
  const [location, setLocation] = useRecoilState(_location);

  const formatDateString = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString);

    if (isNaN(date)) {
      console.error("Invalid date string:", dateString);
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div>
      <div className="home-location">
        {location.name},<span> {location.country}</span>
      </div>
      <div className="home-date">
        {" "}
        {location && location.localtime
          ? formatDateString(location.localtime)
          : "Loading date..."}
      </div>{" "}
    </div>
  );
}

export default DateAndCity;
