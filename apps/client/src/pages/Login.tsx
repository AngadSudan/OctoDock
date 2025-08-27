import React, { useState, useEffect } from "react";
import logo from "../../public/octodocklogo.png";
import configuration from "@/conf/configuration";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "@/redux";
import { Component } from "@/components/raycast-animated-background";

const OctoDockLogin = () => {
  const router = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isAuth) {
    router("/project/dashboard");
  }

  const handleGitHubLogin = () => {
    window.location.href = configuration.backend_url + "/auth/github";
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Background */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Component />

        {/* Showcase content overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-md text-center px-8">
            <div
              className={`
                transform transition-all duration-1000 ease-out delay-300
                ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
              `}
            >
              <h2 className="text-5xl font-light font-600 text-white mb-6 tracking-wide">
                Your Dev
                <br />
                <span className="bg-gradient-to-r font-600 from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Universe
                </span>
              </h2>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-8"></div>

              <p className="text-white text-lg font-light leading-relaxed mb-8">
                Seamlessly manage your projects, collaborate with your team, and
                deploy with confidence.
              </p>

              <div className="space-y-4 text-slate-400 text-sm">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span>Real-time collaboration</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                  <span>Automated deployments</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <span>Advanced analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle corner accent */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-lg"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 bg-gradient-to-bl from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-8 relative">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Main login container */}
        <div
          className={`
            relative z-10 bg-white/5 backdrop-blur-xl border border-white/10
            rounded-3xl p-12 w-full max-w-md text-center shadow-2xl
            transform transition-all duration-1000 ease-out delay-150
            ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          style={{
            boxShadow: `
              0 32px 64px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.05)
            `,
          }}
        >
          {/* Mascot section */}
          <div className="relative mb-10">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-orange-500/20 via-purple-500/10 to-transparent rounded-full"></div>

            {/* Mascot container */}
            <div className="relative z-10 inline-block">
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-slate-800 to-slate-900 p-1">
                <img
                  src={logo}
                  alt="OctoDock"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* Brand section */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-white mb-3 tracking-wide">
              OctoDock
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-4"></div>
            <p className="text-slate-300 text-base font-light leading-relaxed">
              Welcome back to your development workspace
            </p>
          </div>

          {/* Login button */}
          <button
            onClick={handleGitHubLogin}
            className="
              w-full bg-white/10 hover:bg-white/15 backdrop-blur-sm
              border border-white/20 hover:border-white/30
              text-white font-medium py-4 px-6 rounded-xl
              transition-all duration-300 ease-out
              flex items-center justify-center gap-3
              group relative overflow-hidden
            "
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Subtle hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* GitHub icon */}
            <svg
              className="w-5 h-5 relative z-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>

            <span className="relative z-10">Continue with GitHub</span>
          </button>

          {/* Security footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-slate-400 text-xs font-light flex items-center justify-center gap-2">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Enterprise-grade security
            </p>
          </div>
        </div>

        {/* Subtle corner accent */}
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-lg"></div>
      </div>
    </div>
  );
};

export default OctoDockLogin;
