import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { _weather, _location, _city, _next7Days } from "../../services/atom";
import "./AllWeek.css";
import { useNavigate } from "react-router-dom";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

function AllWeek() {
  const [city, setCity] = useRecoilState(_city);
  const [next7Days, setNext7Days] = useRecoilState(_next7Days);
  const [cardDayOpen, setCardDayOpen] = useState(null);
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
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
        // This array has the forecast for the next 7 days
        const next7DaysForecast = data.forecast.forecastday;
        setNext7Days(next7DaysForecast);
        // Process the forecast data as needed for your application
      } else {
        throw new Error("Forecast data is not available");
      }
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  };

  const handleDayClick = (index) => {
    setCardDayOpen(index);
  };

  useEffect(() => {
    fetchAllWeekWeather();
  }, [city]);
  return (
    <div className="allweek-main">
      <div className="allweek-button-and-title">
        <div className="allweek-button" onClick={navigateToHome}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 14 11"
            fill="none"
          >
            <path
              d="M1.99635 5.6049L5.88543 1.71581M5.88543 10.2011L1.99635 6.31201M1.63544 6.0114L12.3874 6.0114"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="allweek-title">Next 7 Days</div>
      </div>
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
                        <div className="cardDay-temp">
                          {day.day.avgtemp_c} °
                        </div>
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
                        <div className="cardDay-temp">
                          {day.day.avgtemp_c} °
                        </div>
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
    </div>
  );
}

export default AllWeek;
