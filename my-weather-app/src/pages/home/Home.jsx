import React from "react";
import { useRecoilState } from "recoil";
import "./Home.css";
import { _weather, _location } from "../../services/atom";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import windImg from "./images/Vector.png";
import AirIcon from "@mui/icons-material/Air";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
function Home() {
  const [weather, setWeather] = useRecoilState(_weather);
  const [location, setLocation] = useRecoilState(_location);

  const formatDateString = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    // Assuming dateString is in the format "YYYY-MM-DD HH:MM"
    const date = new Date(dateString.replace(" ", "T")); // Fixes parsing for certain browsers
    return date.toLocaleDateString("en-US", options);
  };
  const cardsData = [
    {
      name: "RainFall",
      data: weather.precip_mm,
      icon: BeachAccessIcon,
    },
    {
      name: "Wind",
      data: weather.wind_mph,
      icon: AirIcon,
    },
    {
      name: "Humidity",
      data: weather.humidity,
      icon: WaterDropIcon,
    },
  ];

  return (
    <div className="main-home">
      <div className="home-icons">
        <div className="home-serch-icon">
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
        <div className="home-menu-icon">
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
      <div className="home-cards">
        {cardsData.map((data, index) => (
          <div key={index} className="home-card-main">
            <div className="home-cards-icon-name">
              {data.icon ? (
                <data.icon
                  sx={{
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "5px",
                    boxShadow:
                      "0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 9px 10px -3px rgba(192, 27, 60, 0.15)",
                  }}
                />
              ) : null}
              <div className="home-card-name">{data.name}</div>
            </div>
            <div className="home-card-data">{data.data}</div>
          </div>
        ))}
      </div>
      <div className="home-today-by-time"></div>
    </div>
  );
}

export default Home;
