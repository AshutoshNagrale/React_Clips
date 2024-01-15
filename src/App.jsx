import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FileDownload from "./pages/fileDownload/FileDownload";
import SearchBar from "./pages/searchBar/SearchBar";
import Loader from "./pages/loader/Loader";

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
      linkTopic: "Loader",
      to: "loader",
      done: true,
    },
    {
      linkTopic: "Calculator",
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
      link: "Google Login",
      to: "",
      done: false,
    },
  ];

  const AppPage = () => {
    return (
      <div className="appPage">
        <div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <div className="todoList">
              <div></div>
              <p>TODO LIST</p>
            </div>
            <div className="PagesContainer">
              <ul>
                {linksData.map((item, index) => (
                  <li>
                    <Link className="link" to={`/${item.to}`}>
                      <div className={item.done ? "" : "todo"}>
                        {item.linkTopic}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
