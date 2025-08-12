import React, { useRef } from "react";
import videoSrc from "../../../public/octoloop.mp4";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import type { IParallax } from "@react-spring/parallax";
import logo from "../../../public/octodocklogo.png";
import stackBltz from "../../../public/stackblitz.webp";
import ollama from "../../../public/ollama.webp";
import gemini from "../../../public/gemini.webp";
import chatgpt from "../../../public/chatgpt.webp";
import terraform from "../../../public/terraform.webp";
import aws from "../../../public/aws.webp";

const sponsorImages = [stackBltz, ollama, gemini, chatgpt, terraform, aws];

const SponsorCard = ({ image, x, y }) => {
  return (
    <ParallaxLayer offset={0} speed={0.5 + 2 * 0.1}>
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: "100px",
          height: "100px",
        }}
      >
        <img
          src={image}
          alt="sponsor"
          className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
        />
      </div>
    </ParallaxLayer>
  );
};

export default function ParallaxComponent() {
  const parallax = useRef<IParallax>(null!);

  return (
    <div
      className="scrollbar-hide"
      style={{
        width: "100%",
        height: "100vh",
        background: "#0d1b2a",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        overflow: "scroll",
      }}
    >
      <Parallax
        ref={parallax}
        pages={3}
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          overflow: "scroll",
        }}
      >
        {/* Sticky background with video + logo */}
        <ParallaxLayer sticky={{ start: 0, end: 3 }} style={{ zIndex: -1 }}>
          <div className="relative w-full h-full">
            <video
              src={videoSrc}
              loop
              muted
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2">
              <img
                src={logo}
                alt="Octodock Logo"
                className="w-[350px] h-[350px]"
              />
            </div>
          </div>
        </ParallaxLayer>

        {/* batch 1   */}
        <SponsorCard x={10} y={40} image={sponsorImages[0]} />
        <SponsorCard x={80} y={30} image={sponsorImages[1]} />
        <SponsorCard x={20} y={20} image={sponsorImages[2]} />
        <SponsorCard x={80} y={50} image={sponsorImages[2]} />
        <SponsorCard x={30} y={50} image={sponsorImages[3]} />
        <SponsorCard x={70} y={70} image={sponsorImages[3]} />
        {/* batch 2  */}
        <SponsorCard x={25} y={100} image={sponsorImages[4]} />
        <SponsorCard x={15} y={120} image={sponsorImages[5]} />
        <SponsorCard x={5} y={140} image={sponsorImages[2]} />
        <SponsorCard x={30} y={140} image={sponsorImages[1]} />
        <SponsorCard x={75} y={100} image={sponsorImages[4]} />
        <SponsorCard x={85} y={120} image={sponsorImages[2]} />
        <SponsorCard x={80} y={140} image={sponsorImages[5]} />
        <SponsorCard x={90} y={140} image={sponsorImages[1]} />

        {/* batch 3 */}
        <SponsorCard x={20} y={200} image={sponsorImages[0]} />
        <SponsorCard x={10} y={180} image={sponsorImages[3]} />
        <SponsorCard x={65} y={220} image={sponsorImages[1]} />
        <SponsorCard x={80} y={200} image={sponsorImages[4]} />
        <SponsorCard x={10} y={220} image={sponsorImages[2]} />
        <SponsorCard x={30} y={240} image={sponsorImages[5]} />
        <SponsorCard x={70} y={240} image={sponsorImages[3]} />
        <SponsorCard x={90} y={180} image={sponsorImages[0]} />

        {/* batch 4 / */}
        <SponsorCard x={10} y={260} image={sponsorImages[0]} />
        <SponsorCard x={80} y={270} image={sponsorImages[1]} />
        <SponsorCard x={20} y={280} image={sponsorImages[2]} />
        <SponsorCard x={80} y={290} image={sponsorImages[2]} />
        <SponsorCard x={30} y={280} image={sponsorImages[3]} />
        <SponsorCard x={70} y={290} image={sponsorImages[3]} />
      </Parallax>
    </div>
  );
}
