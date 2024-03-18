import React from "react";
import "./jwt.css";
import Navbar from "../navbar/Navbar";
const JWT = () => {
  return (
    <div>
      <Navbar />
      <div>{import.meta.env.VITE_JWT_SERVER_PORT}</div>
    </div>
  );
};

export default JWT;
