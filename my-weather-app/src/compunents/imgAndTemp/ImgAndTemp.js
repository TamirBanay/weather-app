import React from "react";
import { useRecoilState } from "recoil";
import { _weather, _location, _city } from "../../services/atom";
import "./ImgAndTemp.css";
function ImgAndTemp() {
  const [weather, setWeather] = useRecoilState(_weather);
  return (
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
  );
}

export default ImgAndTemp;
