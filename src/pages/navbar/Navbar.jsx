import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate("/");
        window.location.reload( );
      }}
    >
      Back
    </button>
  );
};

export default Navbar;
