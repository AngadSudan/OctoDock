import React, { useEffect, useRef } from "react";
import Html from "../ui/demo";
import MeshComponent from "./model";
import { Canvas } from "@react-three/fiber";
function Hero() {
  const htmlRef = useRef(null);
  const boxRef = useRef(null);

  return (
    <div className="min-h-[100svh]">
      <div ref={htmlRef} className="min-h-screen">
        <Html />
      </div>
      {/* <div className="min-h-screen">
        <Canvas>
          <MeshComponent />
        </Canvas>
      </div> */}
    </div>
  );
}

export default Hero;
