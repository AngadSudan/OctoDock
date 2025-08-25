import Hero from "@/components/Home/Hero";
import Header from "@/components/general/Header";
// import Html from "@/components/ui/demo";
import React from "react";
import TechDesign from "../components/Home/TechDesign";
import Future from "@/components/Home/Future";
import TechStack from "@/components/Home/TechStack";
import ParallaxComponent from "@/components/About/Prallax";
import HorizontalParallax from "@/components/About/HorizontalParallax";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <TechDesign />
      <ParallaxComponent />
      <HorizontalParallax />
    </div>
  );
}

export default Home;
