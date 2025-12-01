"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Loader({ text = "Loading..." }) {
  const containerRef = useRef(null);
  const outerboxRef = useRef(null);
  const innerboxRef = useRef(null);
  const centerLineRef = useRef(null);
  const outerCircleRef = useRef(null);
  const innerCircleRef = useRef(null);
  const bluelinesRef = useRef([]);
  const diagonallinesRef = useRef([]);
  const textRef = useRef("");

  useEffect(() => {
    window.onload = () => {
      const preloader = document.querySelector(".preloader");
      if (preloader) preloader.remove();
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Outer box appears
      tl.from(outerboxRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
      })
        // 2. Inner box appears
        .from(
          innerboxRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
          },
          0.3,
        )
        // 3. Center vertical line appears
        .from(
          centerLineRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            transformOrigin: "center center",
          },
          0.8,
        )
        // 4. Outer circle appears
        .from(
          outerCircleRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
          },
          1.0,
        )
        // 5. Inner circle appears
        .from(
          innerCircleRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
          },
          1.2,
        )
        // 6. Blue horizontal lines appear (staggered)
        .from(
          bluelinesRef.current.filter((el) => el),
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            transformOrigin: "center center",
          },
          1.4,
        )
        // 7. Diagonal red lines appear (staggered)
        .from(
          diagonallinesRef.current.filter((el) => el),
          {
            scaleY: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            transformOrigin: "center",
          },
          1.6,
        )
        .to(centerLineRef.current, {
          width: "355px",
          duration: 1,
          ease: "power2.out",
        })
        .from(textRef.current, {
          opacity: 0,
          repeat: -1, // infinite
          yoyo: true, // fade back in
          ease: "none",
        });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="preloader bg-black h-screen w-full p-6 flex items-center justify-center"
    >
      {/* Outer box */}
      <div
        ref={outerboxRef}
        className="relative p-4 h-3/4 w-3/4 border-[3px] rounded-[10px] border-red-800 flex items-center justify-center"
      >
        {/* Inner box */}
        <div
          ref={innerboxRef}
          className="relative h-[97%] w-[97%] border-[3px] rounded-[10px] border-red-800 flex items-center justify-center"
        >
          {/* Center vertical line */}
          <div
            ref={centerLineRef}
            className="absolute inset-y-0 w-[3px] bg-red-800 left-1/2 transform -translate-x-1/2"
          ></div>

          {/* Diagonal and Blue Lines Container */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left section */}
            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[0] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[50%] left-85 top-20"
              style={{
                transform: "rotate(-55deg)",
                transformOrigin: "top left",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[0] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] left-0 top-[101px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>

            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[1] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[40%] left-85 top-26"
              style={{
                transform: "rotate(-55deg)",
                transformOrigin: "top left",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[1] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] left-0 top-[79px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>

            {/* Top-right section */}
            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[2] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[33.7%] right-85 top-[79px]"
              style={{
                transform: "rotate(55deg)",
                transformOrigin: "top right",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[3] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[33.7%] right-85 top-[101px]"
              style={{
                transform: "rotate(55deg)",
                transformOrigin: "top right",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[2] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] right-0 top-[78px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[3] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] right-0 top-[100px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>

            {/* Bottom-left section */}
            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[4] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[25%] left-85 bottom-[130px]"
              style={{
                transform: "rotate(65deg)",
                transformOrigin: "bottom left",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[5] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[25%] left-85 bottom-[150px]"
              style={{
                transform: "rotate(65deg)",
                transformOrigin: "bottom left",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[4] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] left-0 bottom-[147px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[5] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] left-0 bottom-[127px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>

            {/* Bottom-right section */}
            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[6] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[25%] right-85 bottom-[130px]"
              style={{
                transform: "rotate(-65deg)",
                transformOrigin: "bottom right",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) diagonallinesRef.current[7] = el;
              }}
              className="absolute bg-red-800 w-[3px] h-[25%] right-85 bottom-[150px]"
              style={{
                transform: "rotate(-65deg)",
                transformOrigin: "bottom right",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[6] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] right-0 bottom-[147px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) bluelinesRef.current[7] = el;
              }}
              className="absolute bg-blue-800 w-[33%] h-[3px] right-0 bottom-[127px]"
              style={{
                transformOrigin: "center center",
              }}
            ></div>
          </div>

          {/* Outer circle */}
          <div
            ref={outerCircleRef}
            className="h-[200px] w-[200px] rounded-full bg-black z-5 border border-red-800 flex items-center justify-center"
          >
            <div
              ref={innerCircleRef}
              className="h-[180px] w-[180px] text-white text-center text-3xl flex justify-center items-center  rounded-full bg-black z-5 border border-red-800"
            >
              <p ref={textRef}>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
