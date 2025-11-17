import { useRef, useEffect, useState } from "react";
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
      className="w-full h-screen bg-black relative overflow-hidden"
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

      <div className=" inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20" />
      <AnimatedGrid />
      <CircuitPattern />
      <FloatingParticles />

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

      <div
        ref={scrollContainerRef}
        className="relative h-full flex items-center justify-center px-4"
      >
        <div className="relative w-full max-w-5xl h-[600px]">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ${
                index === activeSlide
                  ? "opacity-100 z-10 slide-animation"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="h-full flex items-center justify-center">
                <div className="relative bg-black/40 backdrop-blur-xl border-2 border-red-400/30 rounded-2xl overflow-hidden hover:border-red-400/60 transition-all duration-500 w-full">
                  <div className="absolute top-6 right-6 text-6xl font-bold text-red-400/20 select-none font-mono z-10">
                    {section.number}
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 p-10">
                    <div className="flex flex-col items-center justify-center space-y-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent rounded-xl" />

                      <div className="relative w-40 h-40 rounded-2xl bg-black/80 border-2 border-red-400/50 flex items-center justify-center hover:border-red-400 transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent" />
                        <section.icon className="w-20 h-20 text-red-400 hover:text-red-300 transition-colors duration-500 relative z-10" />
                        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-red-400/50" />
                        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-red-400/50" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-red-400/50" />
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-red-400/50" />
                      </div>

                      <div className="flex items-center space-x-3 bg-black/60 px-6 py-3 rounded-full border border-red-400/30">
                        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                        <span className="text-gray-400 text-xs font-mono tracking-wider">
                          {section.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-6">
                      <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,100,100,0.5)]">
                          {section.title}
                        </h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-red-400 to-transparent mt-4 rounded-full" />
                      </div>

                      <p className="text-gray-300 font-mono text-base leading-relaxed">
                        <span className="text-red-400">&gt;</span>{" "}
                        {section.description}
                        <span className="animate-pulse text-red-400">_</span>
                      </p>

                      {section.hasButton && (
                        <button className="relative w-fit cursor-pointer group bg-black/80 border-2 border-red-400/50 text-red-400 px-8 py-4 rounded-xl font-mono font-bold hover:border-red-400 hover:text-red-300 hover:shadow-[0_0_25px_rgba(255,80,80,0.8)] hover:scale-105 transition-all duration-500 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <span className="relative z-10 flex items-center space-x-2">
                            <span>INITIALIZE SYSTEM</span>
                            <ArrowRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border-2 border-red-400/50 text-red-400 flex items-center justify-center hover:border-red-400 hover:bg-red-400/10 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border-2 border-red-400/50 text-red-400 flex items-center justify-center hover:border-red-400 hover:bg-red-400/10 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeSlide
                ? "w-12 h-3 bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                : "w-3 h-3 bg-red-400/30 hover:bg-red-400/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 text-red-400/60 font-mono text-xs text-center">
        <div className="flex items-center space-x-2">
          <span>◄</span>
          <span>USE ARROWS TO NAVIGATE</span>
          <span>►</span>
        </div>
      </div>
    </div>
  );
}
