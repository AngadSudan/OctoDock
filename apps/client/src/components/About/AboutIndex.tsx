import React from "react";
import Header from "../general/Header";
import Hero from "./Hero";
import ParallaxComponent from "./Prallax";
import HorizontalParallax from "./HorizontalParallax";

function AboutIndex() {
  return (
    <div>
      <Header />
      <Hero />
      <ParallaxComponent />
      <HorizontalParallax />
    </div>
  );
}

export default AboutIndex;
