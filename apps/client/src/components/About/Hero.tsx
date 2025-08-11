import React, { useState, useEffect } from "react";

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedCounts, setAnimatedCounts] = useState({
    projects: 0,
    developers: 0,
    uptime: 0,
  });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const targets = { projects: 300, developers: 150, uptime: 99.9 };

    Object.keys(targets).forEach((key, index) => {
      setTimeout(() => {
        const increment = Math.ceil(targets[key] / 50);
        const interval = setInterval(() => {
          setAnimatedCounts((prev) => {
            const current = prev[key];
            const next = current + increment;
            if (next >= targets[key]) {
              clearInterval(interval);
              return { ...prev, [key]: targets[key] };
            }
            return { ...prev, [key]: next };
          });
        }, 40);
      }, index * 200);
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-950 relative overflow-hidden">
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff4444' stroke-width='0.5'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3Cpath d='M20 20l40 40M60 20l-40 40'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Dynamic red ambient effects */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[150px] transition-all duration-[3000ms] ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(220,38,38,0.2) 50%, transparent 100%)",
            left: `${5 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[120px] transition-all duration-[2500ms] ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(185,28,28,0.15) 70%, transparent 100%)",
            right: `${10 + mousePosition.x * 0.015}%`,
            bottom: `${20 + mousePosition.y * 0.015}%`,
          }}
        />

        <div className="relative z-10 flex items-center min-h-screen p-8 lg:p-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content Section */}
              <div
                className={`space-y-8 transform transition-all duration-1000 ease-out ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
              >
                {/* System Status Badge */}
                <div
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-xl border border-red-400/30"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.7))",
                    boxShadow: "0 8px 16px rgba(239,68,68,0.1)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                  <span className="text-red-400/90 text-sm font-mono tracking-wider">
                    SYSTEM.ACTIVE
                  </span>
                  <div className="w-px h-4 bg-red-400/20"></div>
                  <span className="text-red-400/70 text-xs font-mono">
                    OCTODOCK.CORE
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Main Heading */}
                  <h1 className="font-mono leading-[1.1] tracking-tight">
                    <span className="block text-4xl lg:text-6xl font-bold text-red-400 mb-2">
                      YOUR JOURNEY TO
                    </span>
                    <span className="block text-5xl lg:text-7xl font-light text-white mb-2">
                      TOMORROW
                    </span>
                    <span className="block text-3xl lg:text-5xl text-red-400/80 font-mono tracking-wider">
                      BEGINS HERE
                    </span>
                  </h1>

                  {/* Decorative separator */}
                  <div className="flex items-center gap-4 my-8">
                    <div className="h-[2px] w-20 bg-gradient-to-r from-red-400 via-red-400/60 to-transparent"></div>
                    <div className="w-3 h-3 rounded-full bg-red-400/60 animate-pulse"></div>
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-red-400/30 to-transparent"></div>
                  </div>

                  {/* Subtitle */}
                  <h2 className="text-2xl lg:text-3xl text-white/90 font-mono font-light leading-relaxed tracking-wide">
                    BUILD.DEPLOY.SCALE
                    <span className="block text-lg text-red-400/70 mt-2">
                      [APPLICATIONS IN MINUTES]
                    </span>
                  </h2>
                </div>

                {/* Enhanced description */}
                <div
                  className="relative p-6 rounded-2xl backdrop-blur-xl border border-red-400/20"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(0,0,0,0.6), rgba(15,23,42,0.4))",
                    boxShadow:
                      "0 16px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="text-gray-300 text-lg leading-relaxed font-mono font-light">
                    <span className="text-red-400/80 font-bold">
                      [OCTODOCK.NEURAL.NETWORK]
                    </span>{" "}
                    revolutionizes development workflows through advanced
                    containerization protocols. Our distributed computing grid
                    empowers developers to focus on innovation while automated
                    systems handle infrastructure complexity, scaling
                    operations, and deployment orchestration across global edge
                    networks.
                  </p>

                  {/* Terminal cursor */}
                  <div className="flex items-center mt-4 text-red-400/60 text-sm font-mono">
                    <span>root@octodock:~# </span>
                    <div className="w-2 h-4 bg-red-400/80 ml-1 animate-pulse"></div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    className="px-8 py-4 rounded-2xl font-mono font-bold transition-all duration-300 hover:scale-105 group relative overflow-hidden tracking-wider"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(239,68,68,0.9) 0%, rgba(185,28,28,0.8) 100%)",
                      boxShadow:
                        "0 16px 32px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                      border: "1px solid rgba(239,68,68,0.5)",
                    }}
                  >
                    <span className="relative z-10 text-white">
                      [INITIALIZE.SYSTEM]
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-300/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button className="px-8 py-4 rounded-2xl font-mono font-medium transition-all duration-300 hover:scale-105 backdrop-blur-xl border border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400/60 tracking-wider">
                    [VIEW.DOCUMENTATION]
                  </button>
                </div>
              </div>

              {/* Visual Section */}
              <div
                className={`relative transform transition-all duration-1200 ease-out delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
              >
                <div className="relative">
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl blur-3xl scale-110 animate-pulse"></div>

                  {/* Main visual container */}
                  <div
                    className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-red-400/30"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.6))",
                      boxShadow:
                        "0 32px 64px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="aspect-[4/3] p-8 flex items-center justify-center">
                      {/* Cyberpunk terminal visualization */}
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col relative overflow-hidden border border-red-400/20">
                        {/* Terminal header */}
                        <div className="flex items-center justify-between p-4 border-b border-red-400/20 bg-red-400/5">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                            <div className="w-3 h-3 rounded-full bg-red-400/30"></div>
                          </div>
                          <div className="text-red-400/70 font-mono text-xs tracking-wider">
                            OCTODOCK.TERMINAL.v2.1.3
                          </div>
                        </div>

                        {/* Terminal content */}
                        <div className="flex-1 p-4 font-mono text-sm space-y-2">
                          <div className="text-red-400/60">
                            $ octodock init --project=webapp
                          </div>
                          <div className="text-green-400/70">
                            ✓ Initializing neural network...
                          </div>
                          <div className="text-green-400/70">
                            ✓ Containerizing application...
                          </div>
                          <div className="text-green-400/70">
                            ✓ Deploying to edge nodes...
                          </div>
                          <div className="text-yellow-400/70">
                            ⚡ Scaling across 12 regions...
                          </div>

                          <div className="mt-6 space-y-1">
                            <div className="text-red-400/80">
                              DEPLOYMENT.STATUS: OPERATIONAL
                            </div>
                            <div className="text-red-400/60">
                              LATENCY: &lt;7ms
                            </div>
                            <div className="text-red-400/60">
                              THROUGHPUT: 10K req/s
                            </div>
                          </div>

                          <div className="flex items-center mt-4">
                            <span className="text-red-400/80">
                              root@octodock:~#{" "}
                            </span>
                            <div className="w-2 h-4 bg-red-400 ml-1 animate-pulse"></div>
                          </div>
                        </div>

                        {/* Floating particles */}
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-red-400/30 rounded-full animate-pulse"
                            style={{
                              left: `${20 + i * 10}%`,
                              top: `${30 + i * 5}%`,
                              animationDelay: `${i * 0.5}s`,
                              animationDuration: `${2 + i * 0.3}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-gradient-to-b from-black via-gray-950 to-black py-20 relative border-t border-red-400/10">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff4444' stroke-width='0.5'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-xl border border-red-400/30 mb-8"
              style={{
                background:
                  "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.6))",
                boxShadow: "0 16px 32px rgba(239,68,68,0.1)",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              <span className="text-red-400 font-mono tracking-wider text-lg font-bold">
                NETWORK.STATISTICS
              </span>
            </div>

            <h3 className="text-4xl font-mono font-bold text-white mb-4 tracking-wider">
              <span className="text-red-400">[GLOBAL.DEPLOYMENT.METRICS]</span>
            </h3>

            <div className="flex justify-center">
              <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-red-400/60 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              count={animatedCounts.projects}
              line="Projects Deployed"
              icon="rocket"
              status="ACTIVE"
              metric="DEPLOY.COUNT"
            />
            <Card
              count={animatedCounts.developers}
              line="Active Developers"
              icon="users"
              status="ONLINE"
              metric="USER.CONN"
            />
            <Card
              count={animatedCounts.uptime}
              line="Uptime Guarantee"
              icon="shield"
              suffix="%"
              status="OPTIMAL"
              metric="SYS.UPTIME"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const Card = ({ count, line, icon, suffix = "+", status, metric }) => {
  const getIcon = () => {
    switch (icon) {
      case "rocket":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84a14.947 14.947 0 015.84 2.58m-2.58 5.84a6.002 6.002 0 01-5.84-2.58m5.84 2.58a6.002 6.002 0 105.84 2.58"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
        );
      case "shield":
        return (
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="text-center p-8 rounded-2xl backdrop-blur-xl border border-red-400/20 hover:border-red-400/40 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(15,23,42,0.6))",
        boxShadow:
          "0 16px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-400/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
        <span className="text-red-400/70 font-mono text-xs tracking-wider">
          {status}
        </span>
      </div>

      {/* Icon container */}
      <div className="flex justify-center mb-6 relative z-10">
        <div
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-all duration-300 border border-red-400/20"
          style={{
            boxShadow:
              "0 8px 16px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {getIcon()}
        </div>
      </div>

      {/* Metric label */}
      <div className="text-red-400/60 font-mono text-sm tracking-wider mb-2 relative z-10">
        [{metric}]
      </div>

      {/* Count */}
      <h1 className="text-5xl font-mono font-bold text-white mb-2 relative z-10">
        <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
          {count}
          {suffix}
        </span>
      </h1>

      {/* Description */}
      <p className="text-red-400/80 font-mono text-lg tracking-wide font-medium relative z-10">
        {line}
      </p>

      {/* Progress bar */}
      <div className="mt-6 relative z-10">
        <div className="h-1 bg-red-400/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-red-400/30"
            style={{
              width: `${Math.min((count / (suffix === "%" ? 100 : 500)) * 100, 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
