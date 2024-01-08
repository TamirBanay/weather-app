import { useRecoilState } from "recoil";
import { _weather, _location, _city } from "../../services/atom";
import React, { useRef, useEffect, useState } from "react";
import "./HomeIconsAndInput.css";
import { useNavigate } from "react-router-dom";

function HomeIconsAndInput() {
  const [serchIsOpen, setSerchIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useRecoilState(_city);

  const navigate = useNavigate();

  const navigateToAllWeek = () => {
    navigate("/allweek");
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCity(value);
  };

  const hendlleCloseSerch = () => {
    setSerchIsOpen(!serchIsOpen);
  };
  return (
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
  );
}

export default HomeIconsAndInput;
