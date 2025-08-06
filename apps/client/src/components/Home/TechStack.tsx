import React, { useState, useEffect } from "react";
import { Lock, Shield, Eye, EyeOff, Server, Activity } from "lucide-react";

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-400/20 rounded-full animate-pulse"
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
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
};

// Mock ScratchToReveal component
const ScratchToReveal = ({
  width,
  height,
  minScratchPercentage,
  className,
  onComplete,
  gradientColors,
  children,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  const handleMouseMove = (e) => {
    if (!isRevealed) {
      const newPercentage = Math.min(scratchPercentage + 2, 100);
      setScratchPercentage(newPercentage);

      if (newPercentage >= minScratchPercentage) {
        setIsRevealed(true);
        onComplete();
      }
    }
  };

  return (
    <div
      className={className}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {isRevealed ? (
        children
      ) : (
        <div
          className="w-full h-full cursor-pointer flex items-center justify-center text-white font-bold relative overflow-hidden"
          style={{
            background: `linear-gradient(45deg, #dc2626, #ef4444, #f87171)`,
          }}
        >
          <div className="text-center relative z-10">
            <Lock size={24} className="mx-auto mb-3 text-white" />
            <div className="text-base font-mono">CLASSIFIED</div>
            <div className="text-sm mt-2 font-mono opacity-80">
              Scratch to reveal
            </div>
            <div className="text-xs mt-2 font-mono bg-black/30 px-2 py-1 rounded">
              {scratchPercentage.toFixed(0)}%
            </div>
          </div>

          {/* Animated overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
};

// Wobbly line component
const WobblyLine = ({ animate }) => (
  <svg
    className="absolute top-1/2 left-full transform -translate-y-1/2"
    width="200"
    height="100"
    viewBox="0 0 200 100"
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <path
      d="M 0 50 Q 25 30, 50 50 T 100 50 Q 125 70, 150 50 T 200 50"
      stroke="#ef4444"
      strokeWidth="2"
      fill="none"
      filter="url(#glow)"
      strokeDasharray="300"
      strokeDashoffset={animate ? "0" : "300"}
      className="transition-all duration-2000 ease-in-out"
    />

    {/* Animated data packets */}
    {animate && (
      <>
        <circle r="3" fill="#ef4444" className="animate-pulse">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#wobble-path" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#fca5a5" className="animate-pulse">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
            <mpath href="#wobble-path" />
          </animateMotion>
        </circle>
      </>
    )}

    <path
      id="wobble-path"
      d="M 0 50 Q 25 30, 50 50 T 100 50 Q 125 70, 150 50 T 200 50"
      opacity="0"
    />
  </svg>
);

function TechStack() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [animateWobble, setAnimateWobble] = useState(false);

  const handleComplete = () => {
    setIsRevealed(true);
  };

  useEffect(() => {
    // Start the wobbly line animation
    const timer = setTimeout(() => {
      setAnimateWobble(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Mock partner logos with red theme
  const partnerSVG = [
    "https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg",
    "https://i.pinimg.com/736x/2f/d8/96/2fd8967a1e1548d1c17432d8a0f11b75.jpg",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAolBMVEX///8AAABJovjm5uafn59ERETW1tZhYWFDn/j29vaFwPp3d3fg4ODc3NzJycmlpaU9nfi2trbt7e35/P8kJCRmZmZdrPny8vLDw8NISEgxMTGvr6/m8v4qKio8PDwJCQm6urqPj49utflUVFSHh4c4ODja6/0fHx9wcHCWlpYUFBR7e3um0Pucy/tZWVlhrvnO5f2z1vx/u/ohlfeTxfrQ5/1F9abpAAAGcElEQVR4nO2Z63aqOBiGwShKRVGUiuKx6va0a08z939rkzMJoNLOdHVt531+YYxJHvKRfEHHAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP5vDKY/PYLv5vntp0fwzTy/3Pkc/v54H/z0GL6V11rt9afH8K281lp3HqQftd5drzODh1atd89TyARbTz89inKW7dPptA/4tTf6YiODp16t1nu+XTFIx4tF87yK/C/2pDnU6/WDZ5f164o0CLRL3WWwqt7cdefRV3obPFDB2uPNIB1tXMm43flKRwa8mbVddnYNmksxbZmhf2IXs+DznbEQrdEgvWXYMUcwSz7fkYmwsMuarsVEdKENO6I4/XRfPESp4a2VlAztAfRleZDMh5/XrWAou8gbhryuT7zY9QrNlvIXF6zd3AzDXPdj/qR4LHKH3c/pORUNx+yh04bRmF8tWdXufiIKK/DG/SqspPnu3ZOj+v8uQx6R2UrTZxcb37EKb/IsZrDW+/tGxS5vc3fwne6G3T+3sWHF4X9uuPS8TrjZ8etNTqYeyp6qG04/hGDt5VZNEaQxvw7o1YpG0IhEB+6dRoSoDYQs0zShfQeEkTXAy7uqlmEY8YqBMhRrpVy2LRmfRBTWVCS+XkYkYsUWOcGnlgzSh2qGE/Fh0+S3L92OZ6K40WiIpkncOFLlycZpz2nhTPuJ8lnzkDfsnGm9xjZWhmIf8vj12jT0V6zFOGLdDlW39CNpmEys3eTXoxSstd4fMt7LltVU3NS+WWYtPoFdsm6qSeB+Wb1G1zL0Rb3Yt+eQx4a7twzb/OdElsjWCI8oAzN0p1qQKmb0nsqOiSPZwCnNNnvTcBHklTNDayd1F13TUPykwYJPGKbdbjdJt/w6qWS4uGSoQ9Sm916+b4xVE9v94YJhUhDkhqOzXTYMMkP5k5WjDXfD4XAnK5J/ZfjrsVTwYm4TNYxmtslIdy6hw16rbyc70zA95rSXmaH4CV+WC7vFnAds0fBgDoQaiual5640RE3By+kpsUZAH3HHq4d7dn3chGE4EvsVyyg7XnJaaEMyF10f+mnK9plTkkXpilcTyUPBUBQXDb0wFM/1KgzTkePTRZoiAuWoN67Be69c8NclQdrF3FL0daCK/dAXS/jKN4fLDMUVzye9oVyr5F0SX8nlq7Dj8y6Khvr5MNP/EX9yjzprnV4QvJF+d8J1lp3Oc4aEh/FWdku04dq0UIcfMYfiK5XVFnOa+SXDwo7vi2dorwueesbiWSVENd10rh4yP2c4sfo4KkMx8NzZ1dA4qzJRkQVz2o91F9UMRfzM9KxOre2vVSVEMwiRCcfKNhT70klVWytDPuuLXCOGod6izf1QhXxFw4DfXfdC9vigDG/MYJRO1C3a65AoGLYLhubWbxuKaW7YhrKPvuqiimFnqG95GS9qI7x+QuyP1aqu0nC9YQvDiDuN5ZMmT3P0ih/N1cHVykvPc/Mr2zBVXVQxFHczvvCG41WdLq6+p4nE8i8VN/YcLpZ88G3zRu61oUgxxebm79dJZhibXylDkd/KVfb6HKqQSnRfpbwJw9bva4LO0pU0V/WNSLf5aVsm5N2A6NS1QRN8TyWitAoR1WfdIGChdzwbWVvC79uwYxiumxSVXaRXDZtBwI40UvBMOgySH/pABGnv4fp/Fn5xKee3UFq5ixlxIrVfZikNv6+H3O9mnjaU8x4bhibD0QVDnR/Sj35s/WafH/obX2fKs22TYs7J98PORH0MjInOKL07fpa1+aIkKTcsz7wdJztP0I+p/ZtTbuDyRduNGWSMGnZLIqdxVvIjP1ts3Dy8jv0S67h0jLPFUiyo/RLDRTtLfnOGvuo2l4iXGE4fK4SowM5LV3LhGu0MQ+1LZ3icGTodQ73BV0BtKJ9kloPmDGeJ/UrGNHSiuKohe09zO0SlTLJVzcTZZktCY5X3ZZrtxuRsGDp+X0XARtwZfi3eCIuf77OjCeM4T+SScdCGXGpGrMHMSP4xzz+H7IxYaQYl3pIeI66+eOrUaYXCgna5/JuZ0il8uet/fulm+HHf//zSIL1vwb8fa7/vOkZpkF7P1f54pi8V/hX9o3m9d0FncN/PIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHB3/ANjnGGZ3nA8pwAAAABJRU5ErkJggg==",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPf6YESbazoWE33WzORaeWBHdCUg3TM_pR6tVKbng85UIq2aYfecOaMMD7VUWsfVSceYA&usqp=CAU",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background elements */}
      <CircuitPattern />
      <FloatingParticles />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-red-900/20" />

      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            {/* Left Side - Text Content */}
            <div className="relative space-y-8">
              {/* Security tag */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-black/60 backdrop-blur-md border border-red-400/30 rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-red-400" />
                </div>
                <span className="text-red-400 font-mono text-lg tracking-wide">
                  CLASSIFIED COMMUNICATIONS
                </span>
              </div>

              {/* Main content */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-extrabold leading-[0.9] tracking-tight">
                  <div className="text-white mb-2">WE MAINTAIN OUR</div>
                  <div className="text-red-400 relative mb-2">
                    <span className="text-red-400">{`{`}</span>
                    <span className="text-white">SECRECY</span>
                    <span className="text-red-400">{`}`}</span>
                  </div>
                  <div className="text-white">OF COMMUNICATION</div>
                </h1>

                <div className="space-y-4 max-w-xl">
                  <p className="text-2xl lg:text-3xl text-gray-300 font-light">
                    Just Like your{" "}
                    <span className="font-mono bg-black/60 backdrop-blur-md border border-red-400/30 px-3 py-1 rounded-lg text-red-400">
                      git data
                    </span>
                  </p>

                  <p className="text-xl lg:text-2xl text-red-400 italic font-mono">
                    Right?
                  </p>
                </div>
              </div>

              {/* Security features */}
              <div className="space-y-4">
                <div className="text-gray-400 font-mono text-sm">
                  SECURITY PROTOCOLS
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      icon: Lock,
                      label: "End-to-End Encrypted",
                      status: "ACTIVE",
                    },
                    {
                      icon: Shield,
                      label: "Zero-Knowledge Architecture",
                      status: "VERIFIED",
                    },
                    {
                      icon: Eye,
                      label: "Privacy-First Design",
                      status: "SECURED",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-black/60 backdrop-blur-md border border-red-400/30 px-4 py-3 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={16} className="text-red-400" />
                        <span className="text-gray-300 font-mono text-sm">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-red-400 font-mono text-xs">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wobbly line - only visible on larger screens */}
              <div className="hidden lg:block relative">
                <WobblyLine animate={animateWobble} />
              </div>
            </div>

            {/* Right Side - Scratch Card */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-red-400/20 rounded-3xl blur-3xl animate-pulse"></div>

                {/* Main card container */}
                <div className="relative bg-black/80 backdrop-blur-md border border-red-400/30 p-8 rounded-3xl">
                  {!isRevealed ? (
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center mb-3">
                        <Server size={24} className="text-red-400" />
                      </div>
                      <h3 className="text-xl font-bold text-red-400 font-mono mb-2">
                        CLASSIFIED PARTNERS
                      </h3>
                      <p className="text-gray-400 font-mono text-sm">
                        AUTHORIZATION REQUIRED
                      </p>
                      {/* Status indicators */}
                      <div className="flex justify-center space-x-2 mt-4">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center mb-3">
                        <EyeOff size={24} className="text-red-400" />
                      </div>
                      <h3 className="text-xl font-bold text-red-400 font-mono mb-2">
                        OOPS! WE REVEALED OUR PARTNERS
                      </h3>
                      <p className="text-gray-400 font-mono text-sm">
                        but your data might be different
                      </p>
                    </div>
                  )}

                  <ScratchToReveal
                    width={500}
                    height={350}
                    minScratchPercentage={70}
                    className="flex items-center justify-center overflow-hidden rounded-2xl border-2 border-red-400/50 bg-black"
                    onComplete={handleComplete}
                    gradientColors={["#dc2626", "#ef4444", "#f87171"]}
                  >
                    <div className="w-full h-full bg-black border border-red-400/30 p-3 flex flex-col items-center justify-center relative">
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="w-full h-fit py-2"
                          style={{
                            backgroundImage: `
                              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: "20px 20px",
                          }}
                        />
                      </div>

                      <div className="relative z-10">
                        {isRevealed && (
                          <div className="text-center top-0">
                            <h4 className="text-lg font-bold text-red-400 font-mono ">
                              AUTHORIZED PARTNERS
                            </h4>
                            <div className="w-16 h-px bg-red-400 mx-auto"></div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-1 h-full w-full">
                          {partnerSVG.map((partner, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-center transition-all duration-500 ${
                                isRevealed ? "animate-bounce" : ""
                              }`}
                              style={{
                                animationDelay: `${index * 0.1}s`,
                              }}
                            >
                              <div className="relative group">
                                <img
                                  src={partner}
                                  alt={`Partner ${index + 1}`}
                                  className="w-24 h-20 rounded-lg shadow-lg border border-red-400/30"
                                />
                                {isRevealed && (
                                  <div className="absolute inset-0 border border-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {isRevealed && (
                          <div className="mt-6 text-center">
                            <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                              <p className="text-red-400 font-mono text-sm">
                                Your data remains encrypted 🔐
                              </p>
                              <div className="flex items-center justify-center mt-2 space-x-2">
                                <Activity size={12} className="text-red-400" />
                                <span className="text-red-400 font-mono text-xs">
                                  SECURE CONNECTION
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScratchToReveal>

                  {/* Card decorative corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-400 rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-400 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-400 rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-400 rounded-br-3xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div className="pb-16 text-center">
            <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-xl p-6 max-w-4xl mx-auto">
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                <span className="text-red-400">DISCLAIMER:</span> This
                demonstration illustrates our commitment to transparency about
                partnerships while maintaining the highest standards of data
                privacy and security for all client information.
              </p>
              <div className="flex items-center justify-center mt-4 space-x-6 text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400">SECURE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-400">ENCRYPTED</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400">PRIVATE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translateY(0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translateY(-8px);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}

export default TechStack;
