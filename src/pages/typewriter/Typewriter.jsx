import React, { useEffect, useRef } from "react";
import "./typewriter.css";
import { Power4, Elastic, gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Navbar from "../navbar/Navbar";

gsap.registerPlugin(TextPlugin);

const Typewriter = () => {
  const words = ["Boldness", "Clarity", "Originality", "Precision"];
  const magnetoRef = useRef();
  const magnetoTextRef = useRef();
  const debugRef = useRef();

  useEffect(() => {
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

    // Magnetic Button

    // const magneto = document.querySelector(".magneto");
    // const magnetoText = document.querySelector(".magneto-text");
    // const debug = document.querySelector(".debug");

    // mouse move
    const activateMagneto = (e) => {
      let boundbox = magnetoRef.current.getBoundingClientRect();
      const magnetoStrength = 40;
      const magnetoTextStrenght = 80;

      const newX =
        (e.clientX - boundbox.left) / magnetoRef.current.offsetWidth - 0.5;
      const newY =
        (e.clientY - boundbox.top) / magnetoRef.current.offsetHeight - 0.5;

      //for debugging
      debugRef.current.innerHTML =
        "cursorX, cursorY -> " +
        e.clientX +
        " , " +
        e.clientY +
        "<br/ >boxLeft -> " +
        Math.ceil(boundbox.left) +
        "<br />cursorInsideButton -> " +
        Math.ceil(e.clientX - boundbox.left) +
        "<br />relativeToTotalWidth -> " +
        ((e.clientX - boundbox.left) / magnetoRef.current.offsetWidth).toFixed(
          2
        ) +
        "<br />shifted -> " +
        (
          (e.clientX - boundbox.left) / magnetoRef.current.offsetWidth -
          0.5
        ).toFixed(2);

      // move button new position
      gsap.to(magnetoRef.current, {
        duration: 1,
        x: newX * magnetoStrength,
        y: newY * magnetoStrength,
        ease: Power4.easeOut,
      });

      //move text to new position
      gsap.to(magnetoTextRef.current, {
        duration: 1,
        x: newX * magnetoTextStrenght,
        y: newY * magnetoTextStrenght,
        ease: Power4.easeOut,
      });
    };
    // mouse leave
    const resetMagneto = (e) => {
      // move button to default positon
      gsap.to(magnetoRef.current, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut,
      });

      // move text to default position
      // move button to default positon
      gsap.to(magnetoTextRef.current, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut,
      });
    };

    //mouse eventListener
    magnetoRef.current.addEventListener("mousemove", activateMagneto);
    magnetoRef.current.addEventListener("mouseleave", resetMagneto);

    return () => {};
  }, []);

  return (
    <div className="typeContainer">
      <Navbar />
      <p>Typewriter Effect</p>
      <h1>
        <>Creating and Crafting Projects with</>
        <span id="typewriter"></span>
        <span id="cursor">|</span>
      </h1>

      <button ref={magnetoRef} className="magneto">
        <span ref={magnetoTextRef} className="magneto-text">
          キャロット
        </span>
      </button>
      <div ref={debugRef} className="debug"></div>
    </div>
  );
};

export default Typewriter;
