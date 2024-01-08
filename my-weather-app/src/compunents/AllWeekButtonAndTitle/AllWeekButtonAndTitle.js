import React from "react";
import "./AllWeekButtonAndTitle.css";
import { useNavigate } from "react-router-dom";

function AllWeekButtonAndTitle() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
  return (
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
  );
}

export default AllWeekButtonAndTitle;
