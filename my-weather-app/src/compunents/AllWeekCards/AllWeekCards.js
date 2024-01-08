import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { _weather, _location, _city, _next7Days } from "../../services/atom";
import "./AllWeekCards.css";

import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

function AllWeekCards() {
  const [next7Days, setNext7Days] = useRecoilState(_next7Days);
  const [cardDayOpen, setCardDayOpen] = useState(null);
  const handleDayClick = (index) => {
    setCardDayOpen(index);
  };
  return (
    <div className="allweek-cards">
      {next7Days.map((day, index) => {
        const isSelected = index === cardDayOpen;
        const date = new Date(day.date);
        const today = new Date();
        const todayFormatted = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        if (day.date === todayFormatted) {
          return null;
        }
        if (
          index === 0 ||
          (index === 1 && next7Days[0].date === todayFormatted)
        ) {
          return (
            <div
              key={index}
              className={`cardDay ${isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(index)}
            >
              {" "}
              {isSelected ? (
                <div
                  className={`cardDay-conteiner ${
                    isSelected ? "selected" : ""
                  }`}
                >
                  <div className="cardDay-conteiner-firstPart">
                    <div className="cardDay-Day">Tommorow</div>
                    <div className="cardDay-tempAndicon">
                      <div className="cardDay-temp">{day.day.avgtemp_c} °</div>
                      <div className="cardDay-icon">
                        <img src={day.day.condition.icon} />
                      </div>
                    </div>
                  </div>
                  <div className="cardDay-conteiner-secPart">
                    <div className="secPart-icons">
                      <BeachAccessIcon
                        sx={{
                          background: "rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          padding: "5px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 9px 10px -3px rgba(192, 27, 60, 0.15)",
                        }}
                      />
                      {day.day.totalprecip_in} cm
                    </div>

                    <div className="secPart-icons">
                      <AirIcon
                        sx={{
                          background: "rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          padding: "5px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 9px 10px -3px rgba(192, 27, 60, 0.15)",
                        }}
                      />
                      {day.day.maxwind_kph} km/h
                    </div>
                    <div className="secPart-icons">
                      <WaterDropIcon
                        sx={{
                          background: "rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          padding: "5px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 9px 10px -3px rgba(192, 27, 60, 0.15)",
                        }}
                      />
                      {day.day.avghumidity} %
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cardDay-conteiner">
                  <div className="cardDay-Day">Tommorow</div>
                  <div className="cardDay-tempAndicon">
                    <div className="cardDay-temp">{day.day.avgtemp_c} °</div>
                    <div className="cardDay-icon">
                      <img src={day.day.condition.icon} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        } else {
          const weekday = date.toLocaleDateString("en-US", {
            weekday: "long",
          });
          return (
            <div
              key={index}
              className={`cardDay ${isSelected ? "selected" : ""}`}
              onClick={() => handleDayClick(index)}
            >
              {isSelected ? (
                <div
                  className={`cardDay-conteiner ${
                    isSelected ? "selected" : ""
                  }`}
                >
                  <div className="cardDay-conteiner-firstPart">
                    <div className="cardDay-Day">{weekday}</div>
                    <div className="cardDay-tempAndicon">
                      <div className="cardDay-temp">{day.day.avgtemp_c} °</div>
                      <div className="cardDay-icon">
                        <img src={day.day.condition.icon} />
                      </div>
                    </div>
                  </div>
                  <div className="cardDay-conteiner-secPart">
                    <div className="secPart-icons">
                      <BeachAccessIcon
                        sx={{
                          background: "rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          padding: "5px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 9px 10px -3px rgba(192, 27, 60, 0.15)",
                        }}
                      />
                      {day.day.totalprecip_in} cm
                    </div>

                    <div className="secPart-icons">
                      <AirIcon
                        sx={{
                          background: "rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          padding: "5px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 9px 10px -3px rgba(192, 27, 60, 0.15)",
                        }}
                      />
                      {day.day.maxwind_kph} km/h
                    </div>
                    <div className="secPart-icons">
                      <WaterDropIcon
                        sx={{
                          background: "rgba(255, 255, 255, 0.5)",
                          borderRadius: "8px",
                          padding: "5px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 9px 10px -3px rgba(192, 27, 60, 0.15)",
                        }}
                      />
                      {day.day.avghumidity} %
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cardDay-conteiner">
                  <div className="cardDay-Day">{weekday}</div>
                  <div className="cardDay-tempAndicon">
                    <div className="cardDay-temp">{day.day.avgtemp_c} °</div>
                    <div className="cardDay-icon">
                      <img src={day.day.condition.icon} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

export default AllWeekCards;
