import React, { useEffect, useRef, useState } from "react";
import "./loader.css";
import gallery from "./data.js";
import Navbar from "../navbar/Navbar.jsx";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

const Loader = () => {
  useEffect(() => {
    const addClasses = () => {
      const loaderContainer = document.querySelector(".loader-container");
      const pageContent = document.querySelector("#page-content");
      loaderContainer.classList.add("hidden");
      pageContent.classList.add("visible");
    };

    window.addEventListener("load", addClasses);

    // LENIS Smooth scrolling
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    // LENIS Ends
  }, []);

  return (
    <>
      <div className="loader-container">
        <svg viewBox="0 0 400 160">
          <text
            x="50%"
            y="50%"
            dy=".32em"
            textAnchor="middle"
            className="text-body"
          >
            Ashutosh
          </text>
          <text
            x="50%"
            y="50%"
            dy=".32em"
            dx="2.4em"
            textAnchor="middle"
            className="text-body"
          >
            .
          </text>
        </svg>
      </div>
      <section id="page-content">
        <header>
          <Navbar />
          <p className="small">Take a trip</p>
          <h2>Destinations Unveiled: Inspiring Journeys Await</h2>
          <p>
            Embark on a virtual adventure to stunning destinations worldwide,
            where breathtaking landscapes, vibrant cultures, and unforgettable
            experiences await.
          </p>
        </header>

        <ul className="gallery">
          {gallery.map((item, index) => (
            <li key={index}>
              <figure>
                <a href="#">
                  <img src={item.src} alt={item.alt} />
                </a>
                <figcaption>
                  <main>
                    <p className="small">{item.days}</p>
                    <h3>
                      {item.title}, <em>{item.country}</em>
                    </h3>
                    <p>{item.desc}</p>
                  </main>

                  <footer>
                    <div>
                      <p className="small">From</p>
                      <p className="price">{item.price}</p>
                    </div>

                    <img
                      src="./src/assets/icon-arrow-right-color.svg"
                      alt="Icon"
                    />
                  </footer>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Loader;
