import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group, Mesh } from "three";
import { SplashCursor } from "./splash-cursor";
import { AnimatedText } from "./AnimatedText";
import bg from "../public/bg.png";
import "@react-three/fiber";

const Cube: React.FC = () => {
  const ref = useRef<Mesh>(null);

  useFrame((state: RootState, delta: number) => {
    if (ref.current) {
      ref.current.rotation.z += delta;
    }
  });
  //   @ts-ignore
  return (
    // @ts-ignore
    <group>
      {/* @ts-ignore */}
      <directionalLight position={[-4, 0.6, 2]} />
      {/* @ts-ignore */}
      <mesh
        ref={ref}
        position={[2, 0, 2]}
        rotation={[-0.02 * Math.PI, 0.15 * Math.PI, -0.2 * Math.PI]}
      >
        {/* @ts-ignore */}
        <boxGeometry args={[1, 1.1, 1]} />
        {/* @ts-ignore */}
        <meshStandardMaterial color={"red"} />
        {/* @ts-ignore */}
      </mesh>
      {/* @ts-ignore */}
    </group>
  );
};

const ThreeComponent: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      {/* Cursor Effect */}
      <SplashCursor />

      {/* Responsive Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-50 px-4">
        <AnimatedText
          text="Docking Octodock..."
          textClassName="text-center font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl transition-all duration-300"
          underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
          underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
          underlineDuration={1.5}
        />
      </div>

      {/* 3D Canvas Background */}
      <Canvas className="absolute inset-0 z-10">
        <Cube />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeComponent;
