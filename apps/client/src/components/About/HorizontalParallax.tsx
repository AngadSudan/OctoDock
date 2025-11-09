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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let scrollTarget = 0;
    let isAnimating = false;

    const smoothScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;

      const diff = scrollTarget - container.scrollLeft;

      // Stop when close enough
      if (Math.abs(diff) < 1) {
        container.scrollLeft = scrollTarget;
        isAnimating = false;
        return;
      }

      // Ease into target
      container.scrollLeft += diff * 0.15;

      requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const atStart = container.scrollLeft <= 0;
      const atEnd = container.scrollLeft >= maxScroll;

      const isScrollingRight = e.deltaY > 0 && !atEnd;
      const isScrollingLeft = e.deltaY < 0 && !atStart;

      if (isScrollingRight || isScrollingLeft) {
        e.preventDefault();

        // Increase scroll distance so one wheel tick moves you meaningfully
        const boost = e.deltaY * 10;

        // Update target
        scrollTarget = Math.min(maxScroll, Math.max(0, scrollTarget + boost));

        if (!isAnimating) {
          isAnimating = true;
          smoothScroll();
        }

        const progress = scrollTarget / maxScroll;
        setScrollProgress(progress);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const sections = [
    {
      icon: Server,
      title: "Initialize Server",
      description:
        "Boot centralized Octodock server with distributed processing power",
      status: "SYSTEM READY",
      number: "01",
      gradient: "from-black via-gray-900 to-black",
      overlayGradient: "from-red-900/20 via-transparent to-red-900/20",
    },
    {
      icon: Code,
      title: "Generate Code",
      description: "AI Octobots analyze and generate production-ready code",
      status: "PROCESSING",
      number: "02",
      gradient: "from-black via-gray-900 to-red-950/30",
      overlayGradient: "from-red-900/20 via-transparent to-red-900/20",
    },
    {
      icon: Zap,
      title: "Deploy Instantly",
      description: "One-click deployment to cloud platforms worldwide",
      status: "DEPLOYMENT READY",
      number: "03",
      gradient: "from-red-950/30 via-gray-900 to-black",
      overlayGradient: "from-red-900/20 via-transparent to-red-900/20",
      hasButton: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden bg-black relative"
    >
      <style>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>

      {/* Header */}
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

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              scrollProgress >= index / (sections.length - 1) - 0.1 &&
              scrollProgress <= index / (sections.length - 1) + 0.1
                ? "bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                : "bg-red-400/30"
            }`}
          />
        ))}
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex h-full overflow-x-hidden overflow-y-hidden scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center relative"
          >
            {/* Background layers */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${section.gradient}`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${section.overlayGradient}`}
            />
            <AnimatedGrid />
            <CircuitPattern />
            <FloatingParticles />

            {/* Large number in corner */}
            <div className="absolute bottom-12 left-12 text-9xl font-bold text-red-400/20 select-none font-mono">
              {section.number}
            </div>

            {/* Content */}
            <div className="text-center group transition-transform duration-500 hover:scale-105 relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <div className="relative bg-black/60 backdrop-blur-md border border-red-400/30 rounded-3xl p-12 group-hover:border-red-400/60 transition-all duration-500">
                <div className="relative mb-8">
                  {/* Icon */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-black/80 border-2 border-red-400/50 flex items-center justify-center group-hover:border-red-400 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent rounded-full" />
                    <section.icon className="w-16 h-16 text-red-400 group-hover:text-red-300 transition-colors duration-500 relative z-10" />
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-400/50 rounded-tl-lg" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-400/50 rounded-tr-lg" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-400/50 rounded-bl-lg" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-400/50 rounded-br-lg" />
                  </div>

                  {/* Title with glow effect */}
                  <div className="relative">
                    <div className="absolute inset-0 text-5xl md:text-7xl font-extrabold blur-sm opacity-30">
                      <h1 className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent">
                        {section.title}
                      </h1>
                    </div>
                    <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent mb-6 drop-shadow-[0_0_20px_rgba(255,100,100,0.5)]">
                      {section.title}
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 font-mono text-lg max-w-md mx-auto leading-relaxed mb-8">
                    <span className="text-red-400">&gt;</span>{" "}
                    {section.description}
                    <span className="animate-pulse text-red-400">_</span>
                  </p>

                  {/* Button for last section */}
                  {section.hasButton && (
                    <button
                      className="relative cursor-pointer group/btn bg-black/80 border-2 border-red-400/50 text-red-400 px-8 py-4 rounded-xl font-mono font-bold 
                      hover:border-red-400 hover:text-red-300 
                      hover:shadow-[0_0_25px_rgba(255,80,80,0.8)] 
                      hover:scale-105 
                      transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

                      <span className="relative z-10 flex items-center space-x-2">
                        <span>INITIALIZE SYSTEM</span>
                        <ArrowRight
                          size={16}
                          className="group-hover/btn:translate-x-1 transition-transform duration-300"
                        />
                      </span>
                    </button>
                  )}
                </div>

                {/* Status indicator */}
                <div className="flex items-center justify-center space-x-2 mt-6">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-gray-400 text-xs font-mono">
                    {section.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-50 text-red-400/60 font-mono text-xs animate-pulse">
        ▼ SCROLL TO NAVIGATE ▼
      </div>
    </div>
  );
}
