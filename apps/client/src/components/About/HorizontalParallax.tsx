"use client";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef, useEffect, useState } from "react";
import { Server, Code, Zap, Terminal, ArrowRight } from "lucide-react";

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-400/40 rounded-full animate-pulse"
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

const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "grid-move 25s linear infinite",
        }}
      />
    </div>
  );
};

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
              stroke="#ef4444"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <circle cx="20" cy="20" r="2" fill="#ef4444" opacity="0.5" />
            <circle cx="180" cy="20" r="2" fill="#ef4444" opacity="0.5" />
            <circle cx="20" cy="180" r="2" fill="#ef4444" opacity="0.5" />
            <circle cx="180" cy="180" r="2" fill="#ef4444" opacity="0.5" />
            <rect
              x="80"
              y="80"
              width="40"
              height="40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
};

export default function HorizontalParallax() {
  const parallax = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
      setCurrentPage(to);
    }
  };

  const scrollToNext = () => {
    const nextPage = (currentPage + 1) % 3;
    scroll(nextPage);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-black relative">
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-red-400 font-mono text-sm z-50">
        <div className="flex items-center space-x-4">
          <Terminal size={20} />
          <span>SYSTEM.OCTODOCK.WORKFLOW</span>
        </div>
        <div className="text-right">
          <div>{currentTime.toTimeString().split(" ")[0]}</div>
          <div className="text-gray-500">{currentTime.toDateString()}</div>
        </div>
      </div>

      <Parallax ref={parallax} pages={3} horizontal className="w-full  h-full">
        <ParallaxLayer
          offset={0}
          speed={0.2}
          className="flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-red-900/20" />
          <AnimatedGrid />
          <CircuitPattern />
          <FloatingParticles />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0.6}
          className="flex items-center justify-center"
        >
          <div
            className="text-center cursor-pointer group transition-transform duration-500 hover:scale-105 relative z-10"
            onClick={scrollToNext}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

            <div className="relative bg-black/60 backdrop-blur-md border border-red-400/30 rounded-3xl p-12 group-hover:border-red-400/60 transition-all duration-500">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-black/80 border-2 border-red-400/50 flex items-center justify-center group-hover:border-red-400 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent rounded-full" />
                  <Server className="w-16 h-16 text-red-400 group-hover:text-red-300 transition-colors duration-500 relative z-10" />
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-400/50 rounded-tl-lg" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-400/50 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-400/50 rounded-bl-lg" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-400/50 rounded-br-lg" />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 text-5xl md:text-7xl font-extrabold blur-sm opacity-30">
                    <h1 className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent">
                      Initialize Server
                    </h1>
                  </div>
                  <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent mb-6">
                    Initialize Server
                  </h1>
                </div>

                <p className="text-gray-300 font-mono text-lg max-w-md mx-auto leading-relaxed">
                  <span className="text-red-400">&gt;</span> Boot centralized
                  Octodock server with distributed processing power
                  <span className="animate-pulse text-red-400">_</span>
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-gray-400 text-xs font-mono">
                  SYSTEM READY
                </span>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0.3}
          className="flex items-end justify-start p-12"
        >
          <div className="text-9xl font-bold text-red-400/20 select-none font-mono">
            01
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.2}
          className="flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/30" />
          <AnimatedGrid />
          <CircuitPattern />
          <FloatingParticles />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.6}
          className="flex items-center justify-center"
        >
          <div
            className="text-center cursor-pointer group transition-transform duration-500 hover:scale-105 relative z-10"
            onClick={scrollToNext}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

            <div className="relative bg-black/60 backdrop-blur-md border border-red-400/30 rounded-3xl p-12 group-hover:border-red-400/60 transition-all duration-500">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-black/80 border-2 border-red-400/50 flex items-center justify-center group-hover:border-red-400 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent rounded-full" />
                  <Code className="w-16 h-16 text-red-400 group-hover:text-red-300 transition-colors duration-500 relative z-10" />
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-400/50 rounded-tl-lg" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-400/50 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-400/50 rounded-bl-lg" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-400/50 rounded-br-lg" />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 text-5xl md:text-7xl font-extrabold blur-sm opacity-30">
                    <h1 className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent">
                      Generate Code
                    </h1>
                  </div>
                  <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent mb-6">
                    Generate Code
                  </h1>
                </div>

                <p className="text-gray-300 font-mono text-lg max-w-md mx-auto leading-relaxed">
                  <span className="text-red-400">&gt;</span> AI Octobots analyze
                  and generate production-ready code
                  <span className="animate-pulse text-red-400">_</span>
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-gray-400 text-xs font-mono">
                  PROCESSING
                </span>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.3}
          className="flex items-end justify-start p-12"
        >
          <div className="text-9xl font-bold text-red-400/20 select-none font-mono">
            02
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.2}
          className="flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-gray-900 to-black" />
          <AnimatedGrid />
          <CircuitPattern />
          <FloatingParticles />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.6}
          className="flex items-center justify-center"
        >
          <div
            className="text-center cursor-pointer group transition-transform duration-500 hover:scale-105 relative z-10"
            onClick={scrollToNext}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

            <div className="relative bg-black/60 backdrop-blur-md border border-red-400/30 rounded-3xl p-12 group-hover:border-red-400/60 transition-all duration-500">
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-black/80 border-2 border-red-400/50 flex items-center justify-center group-hover:border-red-400 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent rounded-full" />
                  <Zap className="w-16 h-16 text-red-400 group-hover:text-red-300 transition-colors duration-500 relative z-10" />
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-400/50 rounded-tl-lg" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-400/50 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-400/50 rounded-bl-lg" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-400/50 rounded-br-lg" />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 text-5xl md:text-7xl font-extrabold blur-sm opacity-30">
                    <h1 className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent">
                      Deploy Instantly
                    </h1>
                  </div>
                  <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent mb-6">
                    Deploy Instantly
                  </h1>
                </div>

                <p className="text-gray-300 font-mono text-lg max-w-md mx-auto leading-relaxed mb-8">
                  <span className="text-red-400">&gt;</span> One-click
                  deployment to cloud platforms worldwide
                  <span className="animate-pulse text-red-400">_</span>
                </p>

                <button className="relative group/btn bg-black/80 border-2 border-red-400/50 text-red-400 px-8 py-4 rounded-xl font-mono font-bold hover:border-red-400 hover:text-red-300 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>INITIALIZE SYSTEM</span>
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-gray-400 text-xs font-mono">
                  DEPLOYMENT READY
                </span>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.3}
          className="flex items-end justify-start p-12"
        >
          <div className="text-9xl font-bold text-red-400/20 select-none font-mono">
            03
          </div>
        </ParallaxLayer>
      </Parallax>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </div>
  );
}
