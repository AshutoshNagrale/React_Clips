import React, { useEffect, useRef } from "react";
import "./parallax.css";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);
import Navbar from "../navbar/Navbar";

const Parallax = () => {
  const sunsetWrapperRef = useRef();
  const sunset_bg_Ref = useRef();

  useEffect(() => {
    // Lenis - smooth scrolling
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    //Lenis Ends

    // Parallax
    const sunsetWrapper = document.querySelector("#sunset-wrapper");
    const parallax = document.querySelectorAll('div[id*="sunset-bg-"]');
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sunsetWrapper,
        // object position , screen position
        start: "top top",
        scrub: true,
        // markers: true,
      },
    });
    parallax.forEach((bg) => {
      const bgSpeed = bg.getAttribute("data-speed");

      timeline.to(
        bg,
        {
          y: 60 * bgSpeed,
          duration: 2,
        },
        0
      );
    });
  }, []);
  return (
    <div className="parallax">
      <section id="hero">
        {/* svgs */}
        <div id="sunset-wrapper">
          <div
            id="sunset-bg-1"
            style={{ backgroundImage: 'url("./parallax/Group-1.svg")' }}
            data-speed="0.2"
          ></div>
          <div
            id="sunset-bg-2"
            style={{ backgroundImage: 'url("./parallax/Group-2.svg")' }}
            data-speed="2"
          ></div>
          <div
            id="sunset-bg-3"
            style={{ backgroundImage: 'url("./parallax/Group-3.svg")' }}
            data-speed="3"
          ></div>
          <div
            id="sunset-bg-4"
            style={{ backgroundImage: 'url("./parallax/Group-5.svg")' }}
            data-speed="6"
          ></div>
        </div>

        <header id="main-header">
          <Navbar />
          <a href="/">
            <img src="./parallax/logo-ww.svg" alt="Logo" />
          </a>
        </header>

        <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="55"
            rx="19.5"
            stroke="#BF5E3B"
          />
          <path
            d="M20 37V19M24 33L20 37L24 33ZM20 37L16 33L20 37Z"
            stroke="#BF5E3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </section>

      <section id="stories">
        <header>
          <h1 className="title">Jujutsu Kaisen</h1>
          <div className="divider"></div>
          <p className="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis autem
            dolorem minus ullam quam tenetur ipsa in itaque porro dignissimos
            deserunt molestias non tempora illum voluptas natus quidem commodi
            recusandae quia dicta accusantium voluptatum, voluptatibus provident
            fugit. Eius fugit dolore, ea facere, numquam sint autem saepe, vero
            nobis iste deleniti!
          </p>
        </header>

        <div className="story-list">
          <div className="story">
            <h2 className="title">Made in Abyss</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
              omnis quam nam autem nobis fuga excepturi perferendis? Doloremque
              sed vero fugiat maiores rerum, id possimus.
            </p>
            <a href="#">Read Full Story</a>
          </div>
          <div className="story">
            <h2 className="title">Dragon Ball Super</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae ab quis officiis reiciendis alias dolorem, facere
              aliquam blanditiis tenetur dignissimos itaque voluptatum minima,
              dicta soluta placeat quisquam! Consequatur, eum ex?
            </p>
            <a href="#">Read Full Story</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parallax;
