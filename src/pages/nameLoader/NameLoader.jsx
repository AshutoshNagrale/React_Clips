import React from "react";
import "./nameloader.css";

const NameLoader = () => {
  return (
    <div className="loader-container">
      <svg viewBox="0 0 400 160">
        <text
          x="50%"
          y="50%"
          dy=".32em"
          textAnchor="middle"
          className="text-body"
        >
          Ashutosh
        </text>
        <text
          x="50%"
          y="50%"
          dy=".32em"
          dx="2.4em"
          textAnchor="middle"
          className="text-body"
        >
          .
        </text>
      </svg>
    </div>
  );
};

export default NameLoader;
