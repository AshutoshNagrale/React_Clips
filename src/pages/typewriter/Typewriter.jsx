import React, { useEffect } from "react";
import "./typewriter.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const Typewriter = () => {
  const words = ["Boldness", "Clarity", "Originality", "Precision"];

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);
    // Main Timeline
    let mainTimeline = gsap.timeline({
      repeat: -1,
    });

    // For each word , create a new timeline,
    // use the Text Plugin,
    // then append that timeline to main one
    words.forEach((word) => {
      let textTimeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 6,
      });

      textTimeline.to("#typewriter", {
        text: word,
        duration: 1,
        onUpdate: () => {
          cursorTimeline.restart();
          cursorTimeline.pause();
        },
        onComplete: () => {
          cursorTimeline.play();
        },
      });

      mainTimeline.add(textTimeline);
    });

    // Blinking cursorTimeline
    let cursorTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.8,
    });

    cursorTimeline
      .to("#cursor", {
        opacity: 1,
        duration: 0,
      })
      .to("#cursor", {
        opacity: 0,
        duration: 0,
        delay: 0.8,
      });
  }, []);

  return (
    <div className="typeContainer">
      <p>Typewriter Effect</p>
      <h1>
        Shaping Visions into Reality with
        <span id="typewriter"></span>
        <span id="cursor">|</span>
      </h1>
    </div>
  );
};

export default Typewriter;
