import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "./userSlice";
import Navbar from "../navbar/Navbar";

const Redux = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(update({ name, email }));
  };
  return (
    <div className="redux-page">
      <Navbar />
      <h1>
        From store {`->`} {user.name} , {user.email}
      </h1>
      <h1>
        From state {`->`}
        {name} , {email}
      </h1>
      <input
        className="redux-input"
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="redux-input"
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => handleClick()}>Click</button>
      <h1 className="imp-text">Important</h1>
      <h2 className="imp-text">
        useSelector, useDispatch is from {`->`} "react-redux"
      </h2>
      <h2 className="imp-text">
        createSlice, configureStore is from {`->`} "@reduxjs/toolkit"
      </h2>
      <ul className="ul-Items">
        <li>
          <h2>1.create slice with initial state and actions in reducers</h2>
          <div>
            <img src="./redux/createSlice.png" alt="" />
          </div>
        </li>
        <li>
          <h2>2.create store which define all reducers</h2>
          <div>
            <img src="./redux/store.png" alt="" />
          </div>
          <h2>3.dispatch</h2>
          <div>
            <img src="./redux/dispatch.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Redux;
