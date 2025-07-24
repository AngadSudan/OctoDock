import React, { useState, useEffect } from "react";

const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsLoaded(true);

    // Generate floating particles with mascot colors
    const particleArray = [];
    for (let i = 0; i < 30; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 4,
        color: [
          "bg-red-400",
          "bg-orange-400",
          "bg-pink-400",
          "bg-purple-400",
          "bg-blue-400",
        ][Math.floor(Math.random() * 5)],
      });
    }
    setParticles(particleArray);
  }, []);

  const handleGitHubLogin = () => {
    console.log("Initiating GitHub login...");
    alert("GitHub login would be initiated here!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-2 h-2 ${particle.color} rounded-full animate-pulse opacity-40`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Large Gradient Orbs matching mascot colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Login Container */}
      <div
        className={`
          relative z-10 bg-slate-800/60 backdrop-blur-2xl border-2 border-gradient-to-r from-red-500/30 via-purple-500/30 to-blue-500/30
          rounded-3xl p-10 w-full max-w-lg text-center shadow-2xl
          transform transition-all duration-1000 ease-out
          ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
        `}
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.8) 100%)",
          border: "2px solid transparent",
          backgroundClip: "padding-box",
          boxShadow: `
            0 0 0 2px rgba(255, 107, 53, 0.3),
            0 25px 50px -12px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Mascot Section with Enhanced Glow */}
        <div className="relative mb-10">
          {/* Multi-layered Glow Effects */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-red-500/40 via-orange-500/30 to-transparent rounded-full animate-pulse"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-radial from-purple-500/30 via-pink-500/20 to-transparent rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-blue-400/40 via-transparent to-transparent rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Mascot Image with Enhanced Frame */}
          <div
            className="relative z-10 inline-block p-2 rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, #ff6b35, #e91e63, #9c27b0, #673ab7, #3f51b5)",
              animation: "rotate 8s linear infinite",
            }}
          >
            <div className="bg-slate-800 rounded-2xl p-4">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                alt="OctoDock Mascot"
                className="w-44 h-44 rounded-xl transition-all duration-500 hover:scale-110 hover:rotate-3"
                style={{
                  background: `url('data:image/svg+xml;base64,${btoa(`
                    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="octopusGradient" cx="50%" cy="40%">
                          <stop offset="0%" style="stop-color:#ffeb3b"/>
                          <stop offset="30%" style="stop-color:#ff6b35"/>
                          <stop offset="70%" style="stop-color:#e91e63"/>
                          <stop offset="100%" style="stop-color:#9c27b0"/>
                        </radialGradient>
                        <linearGradient id="tentacleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#ff6b35"/>
                          <stop offset="50%" style="stop-color:#e91e63"/>
                          <stop offset="100%" style="stop-color:#9c27b0"/>
                        </linearGradient>
                        <linearGradient id="dockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#3f51b5"/>
                          <stop offset="50%" style="stop-color:#2196f3"/>
                          <stop offset="100%" style="stop-color:#03a9f4"/>
                        </linearGradient>
                      </defs>
                      <!-- Dark background for contrast -->
                      <rect width="400" height="400" fill="#0f172a"/>
                      <!-- Octopus Head with highlight -->
                      <circle cx="200" cy="120" r="65" fill="url(#octopusGradient)"/>
                      <ellipse cx="185" cy="100" rx="15" ry="8" fill="rgba(255,255,255,0.3)"/>
                      <!-- Eyes with more detail -->
                      <circle cx="180" cy="110" r="15" fill="#1e293b"/>
                      <circle cx="220" cy="110" r="15" fill="#1e293b"/>
                      <circle cx="182" cy="108" r="6" fill="#fbbf24"/>
                      <circle cx="222" cy="108" r="6" fill="#fbbf24"/>
                      <circle cx="184" cy="106" r="2" fill="#ffffff"/>
                      <circle cx="224" cy="106" r="2" fill="#ffffff"/>
                      <!-- Happy smile -->
                      <path d="M 170 135 Q 200 155 230 135" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
                      <!-- Enhanced Tentacles with curves -->
                      <path d="M 150 170 Q 100 190 110 240 Q 120 280 90 300 Q 80 310 85 320" stroke="url(#tentacleGradient)" stroke-width="22" fill="none" stroke-linecap="round"/>
                      <path d="M 170 180 Q 120 210 130 260 Q 140 300 110 320 Q 100 330 105 340" stroke="url(#tentacleGradient)" stroke-width="20" fill="none" stroke-linecap="round"/>
                      <path d="M 230 180 Q 280 210 270 260 Q 260 300 290 320 Q 300 330 295 340" stroke="url(#tentacleGradient)" stroke-width="20" fill="none" stroke-linecap="round"/>
                      <path d="M 250 170 Q 300 190 290 240 Q 280 280 310 300 Q 320 310 315 320" stroke="url(#tentacleGradient)" stroke-width="22" fill="none" stroke-linecap="round"/>
                      <!-- Docker Container with more detail -->
                      <rect x="165" y="185" width="70" height="90" rx="12" fill="url(#dockGradient)" stroke="#64748b" stroke-width="3"/>
                      <!-- Container light reflection -->
                      <rect x="170" y="190" width="25" height="80" rx="8" fill="rgba(255,255,255,0.1)"/>
                      <!-- Status indicators -->
                      <circle cx="180" cy="200" r="4" fill="#4ade80"/>
                      <rect x="190" y="196" width="35" height="8" rx="4" fill="#4ade80"/>
                      <!-- Code lines -->
                      <rect x="175" y="215" width="45" height="4" rx="2" fill="#ef4444"/>
                      <rect x="175" y="225" width="35" height="4" rx="2" fill="#ef4444"/>
                      <rect x="175" y="235" width="50" height="4" rx="2" fill="#ef4444"/>
                      <rect x="175" y="245" width="40" height="4" rx="2" fill="#ef4444"/>
                      <rect x="175" y="255" width="30" height="4" rx="2" fill="#ef4444"/>
                    </svg>
                  `)}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        </div>

        {/* Welcome Text with mascot-inspired colors */}
        <div className="mb-10">
          <h1
            className="text-5xl font-black mb-3 tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #ff6b35 0%, #e91e63 25%, #9c27b0 50%, #673ab7 75%, #3f51b5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(255, 107, 53, 0.5)",
            }}
          >
            OctoDock
          </h1>
          <p className="text-slate-300 text-xl font-medium leading-relaxed">
            Dive into your development ocean
          </p>
          <div
            className="w-24 h-1 mx-auto mt-4 rounded-full"
            style={{
              background: "linear-gradient(90deg, #ff6b35, #e91e63, #9c27b0)",
            }}
          ></div>
        </div>

        {/* Enhanced GitHub Login Button */}
        <button
          onClick={handleGitHubLogin}
          className="
            w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 ease-out
            flex items-center justify-center gap-4 text-lg
            transform hover:-translate-y-2 hover:scale-105
            relative overflow-hidden group shadow-2xl
          "
          style={{
            background:
              "linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
            boxShadow: `
              0 0 0 2px rgba(255, 107, 53, 0.5),
              0 10px 30px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
          onMouseEnter={(e: any) => {
            e.target.style.boxShadow = `
              0 0 0 2px rgba(255, 107, 53, 0.8),
              0 0 30px rgba(255, 107, 53, 0.4),
              0 15px 40px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `;
          }}
          onMouseLeave={(e: any) => {
            e.target.style.boxShadow = `
              0 0 0 2px rgba(255, 107, 53, 0.5),
              0 10px 30px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `;
          }}
        >
          {/* Animated Background Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

          {/* GitHub Icon */}
          <svg
            className="w-7 h-7 text-white relative z-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>

          <span className="relative z-10 text-white">Continue with GitHub</span>
        </button>

        {/* Footer with enhanced styling */}
        <div className="mt-8 pt-6 border-t border-slate-600/30">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Secure authentication powered by GitHub
          </p>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
