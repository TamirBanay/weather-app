import React from "react";
import { _weather, _location, _city } from "../../services/atom";
import { useRecoilState } from "recoil";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import "./CardForData.css";
function CardForData() {
  const [weather, setWeather] = useRecoilState(_weather);

  const cardsData = [
    {
      name: "RainFall",
      data: weather.precip_mm + " cm",
      icon: BeachAccessIcon,
    },
    {
      name: "Wind",
      data: weather.wind_kph + " km/h",
      icon: AirIcon,
    },
    {
      name: "Humidity",
      data: weather.humidity + " %",
      icon: WaterDropIcon,
    },
  ];
  return (
    <div className="home-cards">
      {cardsData.map((data, index) => (
        <div key={index} className="home-card-main">
          <div className="home-cards-icon-name">
            {data.icon ? (
              <data.icon
                sx={{
                  background: "rgba(255, 255, 255, 0.5)",
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
  );
}

export default CardForData;
