import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/index";

function IndividualActivity() {
  const username = useSelector((state: RootState) => state.auth.user);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const graphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${encodeURIComponent(username.login)}&theme=github-dark`;

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Container with aspect ratio preservation */}
        <div className="relative w-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-2xl">
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-50 pointer-events-none" />

          {/* Header */}
          <div className="relative px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border-b border-white/[0.08]">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-white/90">
              Contribution Activity
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-0.5 sm:mt-1">
              {username.login}'s GitHub activity graph
            </p>
          </div>

          {/* Image container with responsive padding */}
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Loading skeleton */}
            {imageLoading && (
              <div className="absolute inset-3 sm:inset-4 md:inset-6 lg:inset-8 bg-gray-800/50 rounded-lg animate-pulse" />
            )}

            {/* Error state */}
            {imageError && (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 text-center px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-3 sm:mb-4">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-sm sm:text-base text-white/70 mb-2">
                  Failed to load activity graph
                </p>
                <button
                  onClick={() => {
                    setImageError(false);
                    setImageLoading(true);
                  }}
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Responsive image with proper scaling */}
            {!imageError && (
              <div className="relative w-full">
                <img
                  src={graphUrl}
                  alt={`${username.login}'s GitHub activity graph`}
                  loading="lazy"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                  className={`
                    w-full h-auto rounded-lg sm:rounded-xl
                    transition-opacity duration-300
                    ${imageLoading ? "opacity-0" : "opacity-100"}
                  `}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />

                {/* Zoom hint for mobile */}
                <div className="sm:hidden mt-3 flex items-center justify-center gap-2 text-xs text-white/40">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                  <span>Tap image to view details</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>

        {/* Additional mobile optimization note */}
        <div className="mt-3 sm:mt-4 px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
              <span>Live data from GitHub</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
              <span className="hidden sm:inline">
                Optimized for all devices
              </span>
              <span className="sm:hidden">Swipe to scroll if needed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualActivity;
