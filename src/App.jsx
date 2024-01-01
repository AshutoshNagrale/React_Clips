import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FileDownload from "./pages/fileDownload/FileDownload";
import SearchBar from "./pages/searchBar/SearchBar";

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
            <div className="PagesContainer">
              <ul>
                <li>
                  <Link className="link" to="/fileDownload">
                    File Download Page
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/searchPage">
                    Search Page
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
