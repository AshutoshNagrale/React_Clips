import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FileDownload from "./pages/fileDownload/FileDownload";
import SearchBar from "./pages/searchBar/SearchBar";
import Loader from "./pages/loader/Loader";

function App() {
  const [count, setCount] = useState(0);

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
                <li>
                  <Link className="link" to="/fileDownload">
                    <div>File Download Page</div>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/searchPage">
                    <div>Search Page</div>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/loader">
                    <div>Loader</div>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <div className="todo">Calculator </div>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <div className="todo">S3 get and post iamges </div>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <div className="todo">MongoDB Integration</div>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <div className="todo">MYSQL Integration</div>
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/">
                    <div className="todo">Redis Integration</div>
                  </Link>
                </li>
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
