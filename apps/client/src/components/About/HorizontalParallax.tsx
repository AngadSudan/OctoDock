import React, { useRef, useEffect, useState } from "react";
import {
  Server,
  Code,
  Zap,
  Terminal,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
          backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
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

export default function CyberpunkCarousel() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    {
      icon: Server,
      title: "Initialize Server",
      description:
        "Boot centralized Octodock server with distributed processing power",
      status: "SYSTEM READY",
      number: "01",
    },
    {
      icon: Code,
      title: "Generate Code",
      description: "AI Octobots analyze and generate production-ready code",
      status: "PROCESSING",
      number: "02",
    },
    {
      icon: Zap,
      title: "Deploy Instantly",
      description: "One-click deployment to cloud platforms worldwide",
      status: "DEPLOYMENT READY",
      number: "03",
      hasButton: true,
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sections.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen h-screen bg-black relative overflow-hidden"
    >
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .slide-animation {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      <div className="inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20" />
      <AnimatedGrid />
      <CircuitPattern />
      <FloatingParticles />

      {/* Header - Mobile Responsive */}
      <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 flex justify-between items-start sm:items-center text-red-400 font-mono text-xs sm:text-sm z-50 gap-2">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">SYSTEM.OCTODOCK.WORKFLOW</span>
          <span className="sm:hidden text-xs">SYSTEM</span>
        </div>
        <div className="text-right flex-shrink-0 text-xs sm:text-sm">
          <div className="hidden sm:block">
            {currentTime.toTimeString().split(" ")[0]}
          </div>
          <div className="text-gray-500 text-xs">
            {currentTime.toDateString()}
          </div>
        </div>
      </div>

      {/* Main Content Area - Mobile Responsive */}
      <div
        ref={scrollContainerRef}
        className="relative h-full flex items-center justify-center px-3 sm:px-6 lg:px-8 py-24 sm:py-20"
      >
        <div className="relative w-full max-w-5xl h-auto sm:h-[600px]">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeSlide
                    ? "opacity-100 z-10 slide-animation"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="h-full flex items-center justify-center">
                  <div className="relative bg-black/40 backdrop-blur-xl border-2 border-red-400/30 rounded-xl sm:rounded-2xl overflow-hidden hover:border-red-400/60 transition-all duration-500 w-full">
                    {/* Number Badge - Responsive */}
                    <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 text-3xl sm:text-4xl lg:text-6xl font-bold text-red-400/20 select-none font-mono z-10">
                      {section.number}
                    </div>

                    {/* Grid Layout - Stacks on Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-10">
                      {/* Icon Section */}
                      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 lg:space-y-6 relative pt-8 sm:pt-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent rounded-xl" />

                        {/* Icon Container - Responsive Sizing */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-xl lg:rounded-2xl bg-black/80 border-2 border-red-400/50 flex items-center justify-center hover:border-red-400 transition-all duration-500 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent" />
                          <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-red-400 hover:text-red-300 transition-colors duration-500 relative z-10" />
                          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-red-400/50" />
                          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-red-400/50" />
                          <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-red-400/50" />
                          <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-red-400/50" />
                        </div>

                        {/* Status Badge - Responsive */}
                        <div className="flex items-center space-x-2 sm:space-x-3 bg-black/60 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full border border-red-400/30">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-gray-400 text-xs font-mono tracking-wider">
                            {section.status}
                          </span>
                        </div>
                      </div>

                      {/* Text Content - Responsive */}
                      <div className="flex flex-col justify-center space-y-3 sm:space-y-4 lg:space-y-6 px-2 sm:px-0">
                        <div className="relative">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl  font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,100,100,0.5)] leading-tight break-words">
                            {section.title}
                          </h2>
                          <div className="h-1 w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-red-400 to-transparent mt-2 sm:mt-3 lg:mt-4 rounded-full" />
                        </div>

                        <p className="text-gray-300 font-mono text-xs sm:text-sm lg:text-base leading-relaxed break-words">
                          <span className="text-red-400">&gt;</span>{" "}
                          {section.description}
                          <span className="animate-pulse text-red-400">_</span>
                        </p>

                        {/* Button - Responsive */}
                        {section.hasButton && (
                          <button className="relative w-full sm:w-fit cursor-pointer group bg-black/80 border-2 border-red-400/50 text-red-400 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-mono font-bold text-xs sm:text-sm lg:text-base hover:border-red-400 hover:text-red-300 hover:shadow-[0_0_25px_rgba(255,80,80,0.8)] hover:scale-105 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                              <span className="whitespace-nowrap">
                                INITIALIZE SYSTEM
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - Responsive Positioning */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border-2 border-red-400/50 text-red-400 flex items-center justify-center hover:border-red-400 hover:bg-red-400/10 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border-2 border-red-400/50 text-red-400 flex items-center justify-center hover:border-red-400 hover:bg-red-400/10 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Pagination Dots - Responsive */}
      <div className="absolute bottom-16 sm:bottom-20 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-2 sm:space-x-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeSlide
                ? "w-8 sm:w-10 lg:w-12 h-2 sm:h-2.5 lg:h-3 bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                : "w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 bg-red-400/30 hover:bg-red-400/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Hint - Responsive */}
      <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-50 text-red-400/60 font-mono text-xs text-center">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <span>◄</span>
          <span className="hidden sm:inline">USE ARROWS TO NAVIGATE</span>
          <span className="sm:hidden">NAVIGATE</span>
          <span>►</span>
        </div>
      </div>
    </div>
  );
}
