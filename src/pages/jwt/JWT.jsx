import React, { useState } from "react";
import axios from "axios";
import "./jwt.css";
import Navbar from "../navbar/Navbar";
const JWT = () => {
  const [userdata, setUserdata] = useState({ name: "", password: "" });
  const [successMessage, setSuccessMessage] = useState(false);
  const serverUrl = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userdata);
    try {
      const res = await axios.post(serverUrl, userdata);
      if (res.status === 200) {
        setSuccessMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-10 border h-dvh border-white m-2 text-center justify content-center gap-2 flex-row">
      <Navbar />
      {successMessage ? (
        <div className="text-green-500 font-bold text-5xl">
          You have successfully Login
        </div>
      ) : (
        <div className="wrapper border border-white ">
          <div className="text-green-400">Login Page</div>
          <div className="w-full ">
            <label htmlFor="name">Name : </label>
            <input
              className="text-black"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, name: e.target.value }))
              }
              value={userdata.name}
              id="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="password">Password : </label>
            <input
              className="text-black"
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, password: e.target.value }))
              }
              value={userdata.password}
              id="password"
              type="text"
              placeholder="Password"
            />
          </div>
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default JWT;
