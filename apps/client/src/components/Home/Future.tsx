import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Code,
  Terminal,
  Cpu,
  Lock,
  Github,
  Instagram,
  Facebook,
  Twitter,
  Zap,
  Server,
  Bot,
  Play,
  Square,
  Minimize2,
  Activity,
} from "lucide-react";

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
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
            id="hero-circuit"
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
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-circuit)" />
      </svg>
    </div>
  );
};

const InteractiveTerminal = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedCommands, setDisplayedCommands] = useState([]);
  const [commandIndex, setCommandIndex] = useState(0);

  const terminalSessions = [
    {
      title: "Octodock AI Engine",
      commands: [
        {
          input: "octodock init --project webapp",
          output: "✓ Project initialized successfully",
        },
        {
          input: "octodock generate --component Dashboard",
          output: "✓ Generated React Dashboard component",
        },
        {
          input: "octodock deploy --platform vercel",
          output: "✓ Deployed to production: https://app.vercel.app",
        },
        {
          input: "octodock status",
          output: "✓ All systems operational | Uptime: 99.9%",
        },
      ],
    },
    {
      title: "Code Generation Pipeline",
      commands: [
        {
          input: "ai enhance --prompt 'Create user auth'",
          output: "✓ Enhanced prompt with security best practices",
        },
        {
          input: "generate --stack react,node,postgres",
          output: "✓ Full-stack authentication system generated",
        },
        {
          input: "test --coverage",
          output: "✓ Tests passed | Coverage: 94.2%",
        },
        {
          input: "optimize --performance",
          output: "✓ Bundle size reduced by 23%",
        },
      ],
    },
    {
      title: "Deployment Orchestrator",
      commands: [
        {
          input: "docker build --tag octodock/app",
          output: "✓ Container built successfully",
        },
        {
          input: "kubectl apply -f deployment.yaml",
          output: "✓ Deployed to Kubernetes cluster",
        },
        {
          input: "monitor --health-check",
          output: "✓ All endpoints responding | Latency: 45ms",
        },
        {
          input: "scale --replicas 5",
          output: "✓ Auto-scaling enabled | Load balanced",
        },
      ],
    },
  ];

  // Initialize with first session's commands
  useEffect(() => {
    setDisplayedCommands(terminalSessions[0].commands);
  }, []);

  // Handle session switching
  useEffect(() => {
    const sessionInterval = setInterval(() => {
      setCurrentCommand((prev) => {
        const next = (prev + 1) % terminalSessions.length;
        setDisplayedCommands(terminalSessions[next].commands);
        setCommandIndex(0);
        return next;
      });
    }, 8000); // Switch sessions every 8 seconds

    return () => clearInterval(sessionInterval);
  }, []);

  // Handle typing animation within session
  useEffect(() => {
    if (displayedCommands.length === 0) return;

    const typingInterval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCommandIndex((prev) => (prev + 1) % displayedCommands.length);
        setIsTyping(false);
      }, 1500);
    }, 2000); // Show each command for 2 seconds

    return () => clearInterval(typingInterval);
  }, [displayedCommands]);

  const currentSession = terminalSessions[currentCommand];
  const visibleCommands = displayedCommands.slice(0, commandIndex + 1);

  return (
    <div className="relative bg-black/80 backdrop-blur-md border border-red-400/30 rounded-2xl overflow-hidden h-96 shadow-2xl shadow-red-400/10">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/80 border-b border-red-400/30">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal size={16} className="text-red-400" />
            <div className="text-red-400 font-mono text-sm font-medium">
              {currentSession.title}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="hover:bg-red-400/20 p-1 rounded transition-colors">
            <Minimize2 size={16} className="text-gray-400 hover:text-red-400" />
          </button>
          <button className="hover:bg-red-400/20 p-1 rounded transition-colors">
            <Square size={16} className="text-gray-400 hover:text-red-400" />
          </button>
          <button className="hover:bg-green-400/20 p-1 rounded transition-colors">
            <Play size={16} className="text-green-400" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div className="relative h-full">
        <div className="p-6 pb-20 h-full overflow-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-red-400/50">
          <div className="space-y-3">
            {/* Welcome message */}
            <div className="text-gray-500 font-mono text-xs mb-4">
              Welcome to Octodock Terminal v2.1.0
            </div>

            {visibleCommands.map((cmd, index) => (
              <div
                key={`${currentCommand}-${index}`}
                className="space-y-2 animate-fadeIn"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-mono text-sm select-none">
                    octodock@system:~$
                  </span>
                  <span className="text-white font-mono text-sm">
                    {cmd.input}
                  </span>
                  {/* Show cursor only on the last visible command when typing */}
                  {isTyping && index === visibleCommands.length - 1 && (
                    <span className="w-2 h-4 bg-red-400 animate-pulse ml-1" />
                  )}
                </div>
                <div className="text-gray-300 font-mono text-sm pl-6 opacity-90 flex items-center space-x-2">
                  <span>{cmd.output}</span>
                  {cmd.output.includes("✓") && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}

            {/* Current input line when not typing */}
            {!isTyping && (
              <div className="flex items-center space-x-2 opacity-60">
                <span className="text-green-400 font-mono text-sm">
                  octodock@system:~$
                </span>
                <span className="w-2 h-4 bg-red-400 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* System stats - fixed positioning */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-black/80 backdrop-blur-md border border-red-400/30 rounded-lg p-4 shadow-lg">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-1">
                  <Activity size={14} className="text-red-400" />
                  <div className="text-red-400 font-mono text-lg font-bold">
                    2.3ms
                  </div>
                </div>
                <div className="text-gray-500 font-mono text-xs">Response</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <div className="text-green-400 font-mono text-lg font-bold">
                    Active
                  </div>
                </div>
                <div className="text-gray-500 font-mono text-xs">Status</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-1">
                  <Server size={14} className="text-blue-400" />
                  <div className="text-blue-400 font-mono text-lg font-bold">
                    24/7
                  </div>
                </div>
                <div className="text-gray-500 font-mono text-xs">Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Custom styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-track-gray-900::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        .scrollbar-thumb-red-400\/50::-webkit-scrollbar-thumb {
          background: rgba(248, 113, 113, 0.5);
          border-radius: 4px;
        }
        
        .scrollbar-thumb-red-400\/50::-webkit-scrollbar-thumb:hover {
          background: rgba(248, 113, 113, 0.8);
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  );
};

// Enhanced Security Lock Component
const SecurityLock = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        {/* Glow effect */}
        <div
          className="absolute inset-0 bg-red-400/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: "scale(2)" }}
        />

        <div className="relative bg-black/60 backdrop-blur-md border-2 border-red-400/50 rounded-full p-8 w-32 h-32 flex items-center justify-center">
          <Lock size={40} className="text-red-400" />

          {/* Multiple rotating rings */}
          <div
            className="absolute inset-0 border-2 border-red-400/30 rounded-full animate-spin"
            style={{ animation: "spin 3s linear infinite" }}
          />
          <div
            className="absolute inset-2 border border-red-400/20 rounded-full animate-spin"
            style={{ animation: "spin 4s linear infinite reverse" }}
          />

          {/* Status indicators around the circle */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-red-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-20px)`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Security label */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-lg px-3 py-1">
            <div className="text-red-400 font-mono text-xs text-center">
              ENTERPRISE SECURITY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Future() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
          <Server size={20} />
          <span>OCTODOCK.GLOBAL.NETWORK</span>
        </div>
        <div className="text-right">
          <div>{currentTime.toTimeString().split(" ")[0]}</div>
          <div className="text-gray-500">{currentTime.toDateString()}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            {/* Left column - Content */}
            <div className="space-y-10 lg:pr-8">
              {/* Empowering tag */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-black/60 backdrop-blur-md border border-red-400/30 rounded-full flex items-center justify-center">
                  <Zap size={20} className="text-red-400" />
                </div>
                <span className="text-red-400 font-mono text-lg tracking-wide">
                  Empowering Global Startup Growth
                </span>
              </div>

              {/* Main heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-4xl lg:text-6xl font-extrabold leading-[0.9] tracking-tight">
                  <div className="text-white mb-2">FUTURE-DRIVEN</div>
                  <div className="text-white mb-2">SOFTWARE</div>
                  <div className="text-red-400 relative">
                    <span className="text-red-400">{`{`}</span>
                    <span className="text-white">DEVELOPMENT</span>
                    <span className="text-red-400">{`}`}</span>
                  </div>
                </h1>
              </div>

              {/* Description */}
              <div className="max-w-xl">
                <p className="text-gray-300 text-xl leading-relaxed">
                  We craft high-quality digital solutions that help businesses
                  grow, scale, and innovate in a fast-changing world
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button className="group relative bg-white text-black px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:bg-red-400 hover:text-white overflow-hidden shadow-2xl">
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <ArrowRight
                      size={20}
                      className="ml-3 group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button className="group relative bg-transparent text-white border-2 border-red-400/50 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:border-red-400 hover:bg-red-400/10 hover:shadow-lg hover:shadow-red-400/25">
                  <span className="relative z-10">See Our Projects</span>
                  <div className="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </button>
              </div>

              {/* Social media */}
              <div className="pt-8">
                <div className="text-gray-400 font-mono text-sm mb-6">
                  Follow Us
                </div>
                <div className="flex space-x-4">
                  {[
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Twitter, label: "Twitter" },
                  ].map(({ Icon, label }, index) => (
                    <button
                      key={index}
                      className="w-14 h-14 bg-black/60 backdrop-blur-md border border-red-400/30 rounded-xl flex items-center justify-center text-red-400/70 hover:text-red-400 hover:border-red-400/60 hover:bg-red-400/10 transition-all duration-300 group"
                      aria-label={label}
                    >
                      <Icon
                        size={20}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Interactive elements */}
            <div className="space-y-8 lg:pl-8">
              {/* Interactive Terminal */}
              <div className="relative">
                <InteractiveTerminal />

                {/* Decorative frame */}
                <div className="absolute inset-0 border border-red-400/20 rounded-2xl pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-400 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-400 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-400 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-400 rounded-br-2xl" />
                </div>
              </div>

              {/* Security section */}
              <SecurityLock />

              {/* Performance Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 text-center group hover:border-red-400/60 transition-all duration-300">
                  <div className="text-red-400 text-3xl font-bold mb-2">
                    500+
                  </div>
                  <div className="text-gray-400 font-mono text-sm">
                    PROJECTS
                  </div>
                  <div className="w-full h-1 bg-red-400/20 rounded-full mt-3">
                    <div className="w-full h-full bg-red-400 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 text-center group hover:border-red-400/60 transition-all duration-300">
                  <div className="text-red-400 text-3xl font-bold mb-2">
                    24/7
                  </div>
                  <div className="text-gray-400 font-mono text-sm">SUPPORT</div>
                  <div className="w-full h-1 bg-red-400/20 rounded-full mt-3">
                    <div className="w-full h-full bg-green-400 rounded-full" />
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 text-center group hover:border-red-400/60 transition-all duration-300">
                  <div className="text-red-400 text-3xl font-bold mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-400 font-mono text-sm">UPTIME</div>
                  <div className="w-full h-1 bg-red-400/20 rounded-full mt-3">
                    <div className="w-4/5 h-full bg-blue-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 font-mono text-sm flex items-center space-x-3 animate-bounce">
        <span>Scroll to explore</span>
        <div className="w-px h-8 bg-gradient-to-b from-red-400 to-transparent" />
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
      `}</style>
    </div>
  );
}

export default Future;
