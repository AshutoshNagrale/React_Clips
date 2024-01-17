import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import FileDownload from "./pages/fileDownload/FileDownload";
import SearchBar from "./pages/searchBar/SearchBar";
import Loader from "./pages/loader/Loader";
import Typewriter from "./pages/typewriter/Typewriter";
import Parallax from "./pages/parallax/Parallax";
Navigate;
function App() {
  const [count, setCount] = useState(0);
  const linksData = [
    {
      linkTopic: "File Download Page",
      to: "fileDownload",
      done: true,
    },
    {
      linkTopic: "Search Page",
      to: "searchPage",
      done: true,
    },
    {
      linkTopic: "Loader + Lenis Scrolling",
      to: "loader",
      done: true,
    },
    {
      linkTopic: "Calculator with Redux",
      to: "",
      done: false,
    },
    {
      linkTopic: "S3 get and post Iamges",
      to: "",
      done: false,
    },
    {
      linkTopic: "MongoDB Integration",
      to: "",
      done: false,
    },
    {
      linkTopic: "MYSQL Integration",
      to: "",
      done: false,
    },
    {
      linkTopic: "Redis Integration",
      to: "",
      done: false,
    },
    {
      linkTopic: "Google Login",
      to: "",
      done: false,
    },
    {
      linkTopic: "Redux / Redux Toolkit",
      to: "",
      done: false,
    },
    {
      linkTopic: "Typewriter Effect + Magnetic Button",
      to: "typewriter",
      done: true,
    },
    {
      linkTopic: "Parallax Effect",
      to: "parallax",
      done: true,
    },
  ];

  const AppPage = () => {
    return (
      <div className="appPage">
        <div>
          <h1>React Clips</h1>
          <h3>Vite + React</h3>
          <p>by Ashutosh Nagrale</p>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <div className="todoList">
              <div className="yellow-color"></div>
              <p>Todo List</p>
            </div>
            <div className="PagesContainer">
              {linksData.map((item, index) => (
                <Link key={index} to={item.to}>
                  <div className={item.done ? "box" : "todo"}>
                    <p>{item.linkTopic}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<AppPage />} />
          <Route path="fileDownload" element={<FileDownload />} />
          <Route path="searchPage" element={<SearchBar />} />
          <Route path="loader" element={<Loader />} />
          <Route path="typewriter" element={<Typewriter />} />
          <Route path="parallax" element={<Parallax />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
