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
    const sunset = document.querySelector("#sunset-wrapper");
    const parallax = document.querySelectorAll('div[id*="sunset-bg-"]');
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sunset,
        start: "top top",
        scrub: true,
        markers: true,
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
          <div id="sunset-bg-1" data-speed="0.2"></div>
          <div id="sunset-bg-2" data-speed="2"></div>
          <div id="sunset-bg-3" data-speed="3"></div>
          <div id="sunset-bg-4" data-speed="6"></div>
        </div>

        <header id="main-header">
          <Navbar />
          <a href="/">
            <img src="./src/assets/parallax/logo-ww.svg" alt="Logo" />
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
          <h1>Embark on a journey into the heart of nature.</h1>
          <div className="divider"></div>
          <p className="lead">
            From the howls of wolves under the moonlit sky to the ancient
            secrets of the mountains and valleys, explore stories that bring the
            wilderness to life.
          </p>
        </header>

        <div className="story-list">
          <div className="story">
            <h2>The Howl of the Midnight Wolf</h2>
            <p>
              In the heart of the dense forest, where the moonlight barely
              touches the ground, a lone wolf's howl pierces the night. It is
              said that this is no ordinary wolf, but a guardian of ancient
              secrets, calling out to those brave enough to uncover the
              mysteries of the wilderness...
            </p>
            <a href="#">Read Full Story</a>
          </div>
          <div className="story">
            <h2>Whispers of the Forgotten Valley</h2>
            <p>
              Nestled between towering peaks lies a valley shrouded in mist and
              legend. Travelers speak of voices carried on the wind, a language
              not spoken by any living creature. These whispers tell tales of a
              time when the earth was young and nature's magic flowed freely...
            </p>
            <a href="#">Read Full Story</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parallax;
