import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <button className="navbarButton"
      onClick={() => {
        navigate("/");
      }}
    >
      Homepage
    </button>
  );
};

export default Navbar;
