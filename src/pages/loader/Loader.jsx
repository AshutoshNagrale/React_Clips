import { useEffect } from "react";
import "./loader.css";
import gallery from "./data.js";

const Loader = () => {
  useEffect(() => {
    window.addEventListener("load", () => {
      const loaderContainer = document.querySelector(".loader-container");
      const pageContent = document.querySelector("#page-content");
      loaderContainer.classList.add("hidden");
      pageContent.classList.add("visible");
    });
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
