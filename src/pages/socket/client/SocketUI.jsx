import "./socketui.css";
import React from "react";
import io from "socket.io-client";

const socket = io.connect(
  "https://didactic-memory-5wv44wv7769f4q4g-4400.app.github.dev/"
);

const SocketUI = () => {
  return <div>SocketUi</div>;
};

export default SocketUI;
