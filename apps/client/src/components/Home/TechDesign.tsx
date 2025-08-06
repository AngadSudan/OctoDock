import React, { useState, useEffect } from "react";
import {
  Server,
  Bot,
  Zap,
  Code,
  Github,
  Cloud,
  ArrowRight,
  Cpu,
  Database,
  Wifi,
  Terminal,
} from "lucide-react";
import workflow from "../../../public/octodock_working.png";
import CentralNode from "./CentralNode";
// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
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
            linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)
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
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <circle cx="20" cy="20" r="2" fill="red" opacity="0.5" />
            <circle cx="180" cy="20" r="2" fill="red" opacity="0.5" />
            <circle cx="20" cy="180" r="2" fill="red" opacity="0.5" />
            <circle cx="180" cy="180" r="2" fill="red" opacity="0.5" />
            <rect
              x="80"
              y="80"
              width="40"
              height="40"
              fill="none"
              stroke="red"
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

// Process step component
const ProcessStep = ({ icon: Icon, title, description, index, isActive }) => {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

      {/* Main card */}
      <div
        className={`relative bg-black/60 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 group-hover:border-red-400/60 transition-all duration-500 ${isActive ? "border-red-400/60 shadow-lg shadow-red-400/20" : ""}`}
      >
        {/* Step number */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
          {index + 1}
        </div>

        {/* Circuit lines */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-red-400/30 to-transparent" />
          <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-red-400/30 to-transparent" />
        </div>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-400/50 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-400/50 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-400/50 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-400/50 rounded-br-lg" />

        {/* Content */}
        <div className="relative z-10 flex items-center space-x-4">
          <Icon
            size={40}
            className="text-red-400 group-hover:text-red-300 transition-colors duration-500"
          />
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-300 transition-colors duration-500">
              {title}
            </h3>
            <p className="text-gray-400 text-sm font-mono leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-end mt-4 space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${isActive ? "bg-red-400 animate-pulse" : "bg-gray-600"}`}
          />
          <span className="text-gray-500 text-xs font-mono">
            {isActive ? "ACTIVE" : "READY"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Flow arrow component
const FlowArrow = () => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="flex items-center space-x-2 text-red-400">
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse" />
        <ArrowRight size={20} className="animate-pulse" />
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

function TechDesign() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Process steps data
  const steps = [
    {
      icon: Server,
      title: "Centralized Octodock Server",
      description:
        "A centralized Octodock server handles your request with distributed processing power",
    },
    {
      icon: Bot,
      title: "Miniature Octobots",
      description:
        "Specialized Octobots analyze and handle your code with precision and intelligence",
    },
    {
      icon: Zap,
      title: "Enhanced Prompts",
      description:
        "AI enhances your prompts with contextual understanding and optimization",
    },
    {
      icon: Code,
      title: "Complete Code Generation",
      description:
        "Generate complete, production-ready code with best practices and documentation",
    },
    {
      icon: Github,
      title: "One-Click Deployment",
      description:
        "Deploy to Github, Cloud platforms, or your preferred hosting solution instantly",
    },
  ];

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Cycle through steps
    const stepTimer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [steps.length]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background elements */}
      <AnimatedGrid />
      <CircuitPattern />
      <FloatingParticles />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-red-900/20" />

      {/* HUD-style header */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-red-400 font-mono text-sm z-20">
        <div className="flex items-center space-x-4">
          <Terminal size={20} />
          <span>SYSTEM.OCTODOCK.PROCESS</span>
        </div>
        <div className="text-right">
          <div>{currentTime.toTimeString().split(" ")[0]}</div>
          <div className="text-gray-500">{currentTime.toDateString()}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Enhanced title */}
          <div className="text-center mb-16">
            <div className="relative">
              {/* Title glow effect */}
              <div className="absolute inset-0 text-4xl md:text-6xl font-extrabold blur-sm opacity-50">
                <h1 className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent">
                  How It Works
                </h1>
              </div>

              {/* Main title */}
              <h1 className="relative text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                How It Works
              </h1>
            </div>

            <div className="mt-6">
              <p className="text-gray-300 font-mono text-lg">
                <span className="text-red-400">&gt;</span> Revolutionary
                AI-powered development pipeline
                <span className="animate-pulse text-red-400">_</span>
              </p>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left column - Process steps */}
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-md border border-red-400/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Cpu size={24} className="text-red-400 mr-3" />
                  Process Pipeline
                </h2>

                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index}>
                      <ProcessStep
                        icon={step.icon}
                        title={step.title}
                        description={step.description}
                        index={index}
                        isActive={activeStep === index}
                      />
                      {index < steps.length - 1 && <FlowArrow />}
                    </div>
                  ))}
                </div>
              </div>

              {/* System stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/40 backdrop-blur-md border border-red-400/30 rounded-xl p-4 text-center">
                  <div className="text-red-400 text-2xl font-bold">99.9%</div>
                  <div className="text-gray-400 text-sm font-mono">UPTIME</div>
                </div>
                <div className="bg-black/40 backdrop-blur-md border border-red-400/30 rounded-xl p-4 text-center">
                  <div className="text-red-400 text-2xl font-bold">&gt; 2s</div>
                  <div className="text-gray-400 text-sm font-mono">
                    RESPONSE
                  </div>
                </div>
                <div className="bg-black/40 backdrop-blur-md border border-red-400/30 rounded-xl p-4 text-center">
                  <div className="text-red-400 text-2xl font-bold">1M+</div>
                  <div className="text-gray-400 text-sm font-mono">
                    DEPLOYED
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Architecture diagram */}
            <div className="relative">
              <div className="bg-black/40 backdrop-blur-md border border-red-400/30 rounded-2xl p-8 h-[170svh] overflow-hidden">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Database size={24} className="text-red-400 mr-3" />
                  System Architecture
                </h2>

                <img src={workflow} className="w-full h-full" />
              </div>

              {/* Decorative frame */}
              <div className="absolute inset-0 border border-red-400/20 rounded-2xl pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-400" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-400" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-400" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CentralNode activeStep={activeStep} />

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
        
        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default TechDesign;
