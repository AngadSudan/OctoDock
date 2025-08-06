"use client";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Anchor, Cpu, Zap, Code, Database, Wifi } from "lucide-react";

const card1 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiByeD0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MF9saW5lYXJfMV8xIiB4MT0iMCIgeTE9IjAiIHgyPSIxNjAiIHkyPSIxNjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGNjU2NSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjAwMDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K";

const TEXTUREMAP = {
  src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
};
const DEPTHMAP = {
  src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
};

extend(THREE as any);

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

// Animated grid background
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />
    </div>
  );
};

// Circuit pattern overlay
const CircuitPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 20h160M20 20v160M180 20v160M20 180h160"
              stroke="red"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="20" cy="20" r="3" fill="red" />
            <circle cx="180" cy="20" r="3" fill="red" />
            <circle cx="20" cy="180" r="3" fill="red" />
            <circle cx="180" cy="180" r="3" fill="red" />
            <rect
              x="80"
              y="80"
              width="40"
              height="40"
              fill="none"
              stroke="red"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
};

// Enhanced tech card component
const TechCard = ({
  icon: Icon,
  title,
  position,
  color = "red",
  size = "large",
}) => {
  const cardSize = size === "large" ? "w-48 h-48" : "w-36 h-36";
  const iconSize = size === "large" ? 64 : 48;

  return (
    <div className={`absolute ${position}`}>
      <div className="relative group">
        {/* Glow effect */}
        <div
          className={`absolute inset-0 ${cardSize} bg-gradient-to-br from-${color}-400/20 to-${color}-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-flicker`}
        />

        {/* Main card */}
        <div
          className={`relative ${cardSize} bg-black/40 backdrop-blur-md border border-${color}-400/30 rounded-2xl flex flex-col items-center justify-center p-6 group-hover:border-${color}-400/60 transition-all duration-500 animate-flicker`}
        >
          {/* Circuit lines */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div
              className={`absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-${color}-400/50 to-transparent animate-flicker`}
            />
            <div
              className={`absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-${color}-400/50 to-transparent animate-flicker`}
            />
          </div>

          {/* Animated corner accents */}
          <div
            className={`absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-${color}-400/70 rounded-tl-lg animate-flicker`}
          />
          <div
            className={`absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-${color}-400/70 rounded-tr-lg animate-flicker`}
          />
          <div
            className={`absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-${color}-400/70 rounded-bl-lg animate-flicker`}
          />
          <div
            className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-${color}-400/70 rounded-br-lg animate-flicker`}
          />

          {/* Icon */}
          <Icon
            size={iconSize}
            className={`text-${color}-400 mb-4 group-hover:text-${color}-300 transition-colors duration-500 animate-flicker`}
          />

          {/* Title with typing effect */}
          <h2
            className={`text-white text-center text-lg font-bold tracking-wider group-hover:text-${color}-300 transition-colors duration-500 animate-flicker`}
          >
            {title}
          </h2>

          {/* Status indicator */}
          <div className="flex items-center mt-3 space-x-2">
            <div
              className={`w-2 h-2 bg-${color}-400 rounded-full animate-pulse`}
            />
            <span className="text-gray-400 text-xs font-mono animate-flicker">
              ONLINE
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flicker {
          0%,
          19.999%,
          22%,
          62.999%,
          64%,
          64.999%,
          70%,
          100% {
            opacity: 1;
          }
          20%,
          21.999%,
          63%,
          63.999%,
          65%,
          69.999% {
            opacity: 0.4;
          }
        }
        .animate-flicker {
          animation: flicker 8s linear 1;
        }
      `}</style>
    </div>
  );
};

// Post Processing component
const PostProcessing = ({
  strength = 1,
  threshold = 0.5,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    if (!gl.capabilities || !gl.capabilities.isWebGPU) {
      return null; // Fallback for non-WebGPU
    }

    try {
      const postProcessing = new THREE.PostProcessing(gl as any);
      const scenePass = new THREE.RenderPass(scene, camera);
      postProcessing.addPass(scenePass);
      return postProcessing;
    } catch (error) {
      console.warn("PostProcessing not available:", error);
      return null;
    }
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    if (render && render.renderAsync) {
      render.renderAsync();
    }
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef();

  const { material, uniforms } = useMemo(() => {
    const uPointer = { value: new THREE.Vector2(0, 0) };
    const uProgress = { value: 0 };
    const uTime = { value: 0 };

    // Create enhanced material with glowing effects
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uPointer,
        uProgress,
        uTime,
        uTexture: { value: rawMap },
        uDepthMap: { value: depthMap },
        uResolution: { value: new THREE.Vector2(WIDTH, HEIGHT) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 uPointer;
        uniform float uProgress;
        uniform float uTime;
        uniform sampler2D uTexture;
        uniform sampler2D uDepthMap;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // Noise function for digital glitch effect
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;
          vec2 centeredUv = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
          
          // Create scanning effect
          float scanLine = sin(uv.y * 800.0 + uTime * 10.0) * 0.04;
          uv.x += scanLine;
          
          // Digital glitch effect
          float glitch = step(0.98, random(floor(uv * vec2(50.0, 25.0)) + floor(uTime * 2.0)));
          uv.x += glitch * (random(vec2(uTime)) - 0.5) * 0.1;
          
          // Sample texture with parallax effect
          vec4 depth = texture2D(uDepthMap, uv);
          vec2 parallaxUv = uv + (depth.r * uPointer * 0.02);
          vec4 texColor = texture2D(uTexture, parallaxUv);
          
          // Create distance field for center glow
          float dist = length(centeredUv);
          float centerGlow = 1.0 - smoothstep(0.0, 0.8, dist);
          
          // Animated progress ring
          float angle = atan(centeredUv.y, centeredUv.x);
          float normalizedAngle = (angle + 3.14159) / (2.0 * 3.14159);
          float ring = smoothstep(0.3, 0.32, dist) - smoothstep(0.35, 0.37, dist);
          float progressRing = step(normalizedAngle, uProgress) * ring;
          
          // Create hexagonal pattern
          vec2 hexUv = uv * 20.0;
          vec2 hexId = floor(hexUv);
          vec2 hexLocal = fract(hexUv) - 0.5;
          float hexDist = max(abs(hexLocal.x), abs(hexLocal.y * 0.866) + abs(hexLocal.x) * 0.5);
          float hexagon = 1.0 - smoothstep(0.4, 0.42, hexDist);
          
          // Combine effects
          vec3 color = texColor.rgb;
          
          // Add red glow to center
          color += vec3(0.0, 1.0, 1.0) * centerGlow * 0.3;
          
          // Add red progress ring
          color += vec3(1.0, 0.2, 0.0) * progressRing * 2.0;
          
          // Add subtle hexagonal overlay
          color += vec3(0.0, 0.8, 1.0) * hexagon * 0.1;
          
          // Add scanning lines
          float scanLines = sin(uv.y * 1200.0) * 0.04 + 0.96;
          color *= scanLines;
          
          // Digital noise
          float noise = random(uv + uTime * 0.01) * 0.05;
          color += noise;
          
          // Vignette effect
          float vignette = 1.0 - dist * 0.5;
          color *= vignette;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
    });

    return {
      material,
      uniforms: {
        uPointer,
        uProgress,
        uTime,
      },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock, pointer }) => {
    if (uniforms) {
      uniforms.uProgress.value =
        Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
      uniforms.uPointer.value.x = pointer.x;
      uniforms.uPointer.value.y = pointer.y;
      uniforms.uTime.value = clock.getElapsedTime();
    }

    // Add subtle rotation to the mesh
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(clock.getElapsedTime() * 0.2) * 0.02;
    }
  });

  const scaleFactor = 0.8; // Make it more prominent

  return (
    <mesh
      ref={meshRef}
      scale={[w * scaleFactor, h * scaleFactor, 1]}
      material={material}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
    </mesh>
  );
};

export const Html = () => {
  const titleWords = "Build Your Dreams".split(" ");
  const subtitle = "AI-powered creativity for the next generation.";
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div className="h-screen relative overflow-hidden bg-black">
      {/* Background elements */}
      <AnimatedGrid />
      <CircuitPattern />
      <FloatingParticles />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-red-900/20" />

      {/* Main content */}
      <div className="h-screen uppercase items-center w-full absolute z-10 pointer-events-none px-10 flex justify-center flex-col">
        {/* HUD-style header */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-red-400 font-mono text-sm">
          <div className="flex items-center space-x-4"></div>
          <div className="text-right">
            <div>{currentTime.toTimeString().split(" ")[0]}</div>
            <div className="text-gray-500">{currentTime.toDateString()}</div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Enhanced floating tech cards */}
          <TechCard
            icon={Zap}
            title="Build Faster"
            position="top-24 right-8"
            color="red"
            size="large"
          />

          <TechCard
            icon={Anchor}
            title="Ship Smoother"
            position="bottom-24 left-8"
            color="red"
            size="large"
          />

          {/* Additional smaller tech elements */}
          <TechCard
            icon={Cpu}
            title="Process"
            position="top-24 left-8"
            color="red"
            size="large"
          />

          <TechCard
            icon={Database}
            title="Store"
            position="bottom-24 right-8"
            color="red"
            size="large"
          />

          {/* Enhanced main title */}
          <div className="relative z-20">
            {/* Title glow effect */}
            <div className="absolute inset-0 text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold blur-sm opacity-50">
              <div className="flex space-x-2 lg:space-x-6 text-red-400">
                {titleWords.map((word, index) => (
                  <div
                    key={`glow-${index}`}
                    className={index < visibleWords ? "fade-in" : ""}
                    style={{
                      animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                      opacity: index < visibleWords ? undefined : 0,
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* Main title */}
            <div className="relative text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold">
              <div className="flex space-x-2 lg:space-x-6 overflow-hidden">
                {titleWords.map((word, index) => (
                  <div
                    key={index}
                    className={`${index < visibleWords ? "fade-in" : ""} bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent`}
                    style={{
                      animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                      opacity: index < visibleWords ? undefined : 0,
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced subtitle */}
          <div className="relative z-20 mt-6">
            <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl overflow-hidden">
              <div
                className={`${subtitleVisible ? "fade-in-subtitle" : ""} text-gray-300 font-mono tracking-wide`}
                style={{
                  animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
                  opacity: subtitleVisible ? undefined : 0,
                }}
              >
                <span className="text-red-400">&gt;</span> {subtitle}
                <span className="animate-pulse text-red-400">_</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80">
            <div className="flex items-center space-x-4 text-red-400 font-mono text-sm">
              <span>INITIALIZING</span>
              <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-cyan-400 rounded-full animate-pulse"
                  style={{
                    width: `${(visibleWords / titleWords.length) * 100}%`,
                  }}
                />
              </div>
              <span>
                {Math.round((visibleWords / titleWords.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced 3D Canvas - now more prominent */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Glow effect for the 3D element */}
          <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full transform scale-150" />
          <div className="absolute inset-0 bg-red-400/10 blur-2xl rounded-full transform scale-125 animate-pulse" />

          <Canvas
            flat
            className="relative z-40"
            style={{ width: "500px", height: "500px" }}
            camera={{ position: [0, 0, 1], fov: 45 }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#ff0000"
            />
            <PostProcessing />
            <Scene />
          </Canvas>

          {/* Decorative frame around 3D element */}
          <div className="absolute inset-0 border border-red-400/30 rounded-lg pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-400" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-400" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-400" />
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        .fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .fade-in-subtitle {
          animation: fade-in-subtitle 1.2s ease-out forwards;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(90deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
        @keyframes fade-in-subtitle {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Html;
