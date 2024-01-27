import React, { useState, useRef, useEffect, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import SuspenseLoader from "./pages/s3/SuspenseLoader.jsx";

//lazy loading issue
import Loader from "./pages/loader/Loader.jsx";

//fixed delay function to lazy load forefully after 2s
async function delayForDemo(promise) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return promise;
}

// lazy loading
import { lazy } from "react";
const S3 = lazy(() => delayForDemo(import("./pages/s3/S3.jsx")));
const SearchBar = lazy(() => import("./pages/searchBar/SearchBar.jsx"));
const Typewriter = lazy(() => import("./pages/typewriter/Typewriter"));
const Parallax = lazy(() => import("./pages/parallax/Parallax"));
const FileDownload = lazy(() => import("./pages/fileDownload/FileDownload"));

function App() {
  const [count, setCount] = useState(0);
  const linksData = [
    {
      linkTopic: "TODO",
      to: "",
      done: false,
    },
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
      to: "s3",
      done: true,
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
      linkTopic: "Typewriter + Magnetic Button",
      to: "typewriter",
      done: true,
    },
    {
      linkTopic: "Parallax Effect",
      to: "parallax",
      done: true,
    },
    {
      linkTopic: "Socket.io",
      to: "",
      done: false,
    },
    {
      linkTopic: "GOOGLE Drive API Integration",
      to: "",
      done: false,
    },
  ];

  const AppPage = () => {
    return (
      <div className="appPage">
        <div>
          <h1>React Clips</h1>
          <p>by Ashutosh Nagrale</p>
          <div className="card">
            <div className="PagesContainer">
              {linksData.map((item, index) => (
                <Link key={index} to={item.done ? item.to : ""}>
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
          <Route
            path="fileDownload"
            element={
              <Suspense fallback={<SuspenseLoader />}>
                <FileDownload />
              </Suspense>
            }
          />
          <Route
            path="searchPage"
            element={
              <Suspense fallback={<SuspenseLoader />}>
                <SearchBar />
              </Suspense>
            }
          />
          <Route path="loader" element={<Loader />} />
          <Route
            path="typewriter"
            element={
              <Suspense fallback={<SuspenseLoader />}>
                <Typewriter />
              </Suspense>
            }
          />
          <Route
            path="parallax"
            element={
              <Suspense fallback={<SuspenseLoader />}>
                <Parallax />
              </Suspense>
            }
          />
          <Route
            path="s3"
            element={
              <Suspense fallback={<SuspenseLoader />}>
                <S3 />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
