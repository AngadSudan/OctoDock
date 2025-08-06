import {
  Bot,
  Cloud,
  Code,
  Github,
  Server,
  Zap,
  Activity,
  Cpu,
  Database,
  Network,
  Shield,
  Wifi,
} from "lucide-react";
import React from "react";

function CentralNode({ activeStep }) {
  // Peripheral text elements data
  const peripheralElements = [
    {
      text: "LATENCY: <7ms",
      subtext: "Ultra-low response time",
      angle: 15,
      distance: 280,
      icon: Activity,
    },
    {
      text: "THROUGHPUT: 10K req/s",
      subtext: "High performance processing",
      angle: 75,
      distance: 290,
      icon: Cpu,
    },
    {
      text: "UPTIME: 99.99%",
      subtext: "Enterprise grade reliability",
      angle: 135,
      distance: 285,
      icon: Shield,
    },
    {
      text: "STORAGE: Distributed",
      subtext: "Fault-tolerant data layer",
      angle: 195,
      distance: 275,
      icon: Database,
    },
    {
      text: "NETWORK: Global CDN",
      subtext: "Worldwide edge deployment",
      angle: 255,
      distance: 290,
      icon: Network,
    },
    {
      text: "PROTOCOL: WebSocket",
      subtext: "Real-time communication",
      angle: 315,
      distance: 280,
      icon: Wifi,
    },
  ];

  // Status indicators in corners
  const cornerStatuses = [
    { text: "SYS.STATUS", value: "OPERATIONAL", position: "top-left" },
    { text: "LOAD.AVG", value: "0.34", position: "top-right" },
    { text: "MEM.USAGE", value: "67%", position: "bottom-left" },
    { text: "CPU.CORES", value: "16/16", position: "bottom-right" },
  ];

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-visible">
      {/* Corner status indicators */}
      {cornerStatuses.map((status, index) => (
        <div
          key={index}
          className={`absolute ${
            status.position === "top-left"
              ? "top-4 left-4"
              : status.position === "top-right"
                ? "top-4 right-4"
                : status.position === "bottom-left"
                  ? "bottom-4 left-4"
                  : "bottom-4 right-4"
          }`}
        >
          <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-lg px-3 py-2">
            <div className="text-red-400/70 font-mono text-xs">
              {status.text}
            </div>
            <div className="text-red-400 font-mono text-sm font-bold">
              {status.value}
            </div>
          </div>
        </div>
      ))}

      {/* Peripheral information elements */}
      {peripheralElements.map((element, index) => {
        const angle = (element.angle * Math.PI) / 180;
        const x = Math.cos(angle) * element.distance;
        const y = Math.sin(angle) * element.distance;
        const isActive = activeStep === index % 5; // Cycle through based on activeStep

        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            }}
          >
            <div
              className={`relative transition-all duration-500 ${
                isActive ? "scale-110" : "hover:scale-105"
              }`}
            >
              {/* Glow effect for active elements */}
              {isActive && (
                <div
                  className="absolute inset-0 bg-red-400/20 rounded-xl blur-lg animate-pulse"
                  style={{ transform: "scale(1.5)" }}
                />
              )}

              <div
                className={`relative bg-black/70 backdrop-blur-md border rounded-xl p-3 min-w-[180px] transition-all duration-500 ${
                  isActive
                    ? "border-red-400/60 shadow-lg shadow-red-400/25"
                    : "border-red-400/30 hover:border-red-400/50"
                }`}
              >
                {/* Header with icon */}
                <div className="flex items-center space-x-2 mb-2">
                  <element.icon
                    size={16}
                    className={`transition-colors duration-500 ${
                      isActive ? "text-red-400" : "text-red-400/70"
                    }`}
                  />
                  <div
                    className={`font-mono text-sm font-bold tracking-wide transition-colors duration-500 ${
                      isActive ? "text-red-400" : "text-red-400/80"
                    }`}
                  >
                    {element.text}
                  </div>
                </div>

                {/* Subtext */}
                <div className="text-gray-400 font-mono text-xs leading-relaxed">
                  {element.subtext}
                </div>

                {/* Status indicator */}
                <div className="flex justify-end mt-2">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isActive ? "bg-red-400 animate-pulse" : "bg-red-400/50"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Central node */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center animate-pulse">
            <Server size={32} className="text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-red-400 font-mono text-sm whitespace-nowrap">
            OCTODOCK CORE
          </div>
        </div>
      </div>

      {/* Surrounding nodes */}
      {[
        { icon: Bot, label: "OCTOBOTS", angle: -90 },
        { icon: Zap, label: "ENHANCER", angle: -18 },
        { icon: Code, label: "GENERATOR", angle: 54 },
        { icon: Github, label: "GITHUB", angle: 126 },
        { icon: Cloud, label: "CLOUD", angle: 198 },
      ].map((node, index) => {
        const angle = (node.angle * Math.PI) / 180;
        const radius = 160;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={index}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            }}
          >
            <div className="relative">
              <div
                className={`w-16 h-16 bg-black/60 border-2 rounded-full flex items-center justify-center ${
                  activeStep === index
                    ? "border-red-400 shadow-lg shadow-red-400/50"
                    : "border-red-400/30"
                } transition-all duration-500`}
              >
                <node.icon
                  size={20}
                  className={
                    activeStep === index ? "text-red-400" : "text-red-400/50"
                  }
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-red-400/70 font-mono text-xs whitespace-nowrap">
                {node.label}
              </div>

              {/* Connection line */}
              <div
                className={`absolute top-1/2 left-1/2 rotate-180 h-px bg-gradient-to-r origin-left ${
                  activeStep === index
                    ? "from-red-400 to-transparent"
                    : "from-red-400/30 to-transparent"
                } transition-all duration-500`}
                style={{
                  width: `${radius - 32}px`,
                  transform: `rotate(${node.angle}deg) translate(0, -50%)`,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Your existing data flow animations - keeping them exactly as they are */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400/50 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              animation: `orbit ${3 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Additional floating text elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <div className="text-red-400/30 mb-32 font-mono text-xs tracking-[0.2em] animate-pulse">
            ▲ OCTODOCK NEURAL NETWORK ▲
          </div>
        </div> */}

        {/* <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="text-red-400/80 font-mono text-xs tracking-[0.2em] animate-pulse">
            ▼ DISTRIBUTED COMPUTING GRID ▼
          </div>
        </div> */}

        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 -rotate-90">
          <div className="text-red-400/80 font-mono text-xs tracking-[0.2em] animate-pulse">
            ◄ EDGE PROCESSING NODES
          </div>
        </div>

        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 rotate-90">
          <div className="text-red-400/80 font-mono text-xs tracking-[0.2em] animate-pulse">
            GLOBAL DEPLOYMENT ►
          </div>
        </div>
      </div>

      {/* Custom styles - keeping your original orbit animation */}
      <style>{`
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

export default CentralNode;
