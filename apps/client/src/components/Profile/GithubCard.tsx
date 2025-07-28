import React, { useEffect, useState } from "react";
import {
  Github,
  MapPin,
  Calendar,
  ExternalLink,
  Mail,
  Building2,
  Globe,
  Sparkles,
  Activity,
  Users,
  GitFork,
  Book,
  Star,
  Eye,
  Clock,
  Code,
  Trophy,
  Zap,
  Crown,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

function GithubCard() {
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    if (userData) {
      const timer = setTimeout(() => setIsLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [userData]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const getAccountAge = (dateString: string) => {
    if (!dateString) return "";
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  if (!userData || !isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Animated Loading */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-500 rounded-full animate-spin mx-auto"
              style={{ animationDelay: "0.3s", animationDirection: "reverse" }}
            ></div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-xl font-semibold">
              Loading your Octadock profile...
            </p>
            <p className="text-gray-400 text-sm">Fetching the latest data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-fit  top-[10%] bg-black p-4 flex items-center justify-center w-full overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        Multiple gradient orbs
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/15 via-red-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-pulse"></div>
        <div
          className="absolute top-20 left-20 w-2 h-2 bg-purple-500/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-blue-500/30 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-40 w-2 h-2 bg-cyan-500/30 rounded-full animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div
        className={`relative w-full max-w-6xl transition-all duration-1000 transform ${
          isLoaded
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        {/* Premium Card Wrapper */}
        <div className="relative bg-gradient-to-br from-gray-900/60 via-black/90 to-gray-900/60 backdrop-blur-2xl rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="relative p-8 pb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Enhanced Avatar Section */}
              {userData.avatar_url && (
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-700"></div>

                  <div className="relative">
                    {/* Avatar container */}
                    <div className="w-36 h-36 lg:w-44 lg:h-44 relative">
                      <img
                        src={userData.avatar_url}
                        alt={userData.name || userData.login}
                        className="w-full h-full object-cover rounded-3xl border-4 border-gray-600/50 group-hover:border-purple-500/70 transition-all duration-500 shadow-2xl"
                        loading="lazy"
                      />

                      {/* Enhanced status indicators */}
                      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-4 border-black flex items-center justify-center shadow-xl">
                        <Activity className="w-5 h-5 text-black animate-pulse" />
                      </div>

                      <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-4 border-black flex items-center justify-center shadow-xl">
                        <Sparkles className="w-5 h-5 text-black animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Profile Info */}
              <div className="flex-1 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      {userData.name || userData.login}
                    </h1>

                    {/* Enhanced badges */}
                    <div className="flex gap-2">
                      <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/40 backdrop-blur-md">
                        <span className="text-purple-300 text-sm font-bold flex items-center gap-1">
                          <Crown className="w-4 h-4" />
                          DEVELOPER
                        </span>
                      </div>

                      {userData.site_admin && (
                        <div className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full border border-red-500/40 backdrop-blur-md">
                          <span className="text-red-300 text-sm font-bold">
                            ADMIN
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Github className="w-6 h-6 text-gray-400" />
                    <span className="text-xl font-semibold">
                      @{userData.login}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm bg-gray-800/50 px-2 py-1 rounded-lg">
                      ID: {userData.id}
                    </span>
                  </div>

                  {/* Bio section */}
                  {userData.bio && (
                    <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-4 border border-gray-700/30">
                      <p className="text-gray-300 text-lg leading-relaxed italic">
                        "{userData.bio}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.created_at && (
                    <div className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Member since
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatDate(userData.created_at)} •{" "}
                          {getAccountAge(userData.created_at)} ago
                        </p>
                      </div>
                    </div>
                  )}

                  {userData.location && (
                    <div className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 border border-gray-700/30 hover:border-red-500/30 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Location
                        </p>
                        <p className="text-gray-400 text-xs">
                          {userData.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {userData.company && (
                    <div className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 border border-gray-700/30 hover:border-green-500/30 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Company
                        </p>
                        <p className="text-gray-400 text-xs">
                          {userData.company}
                        </p>
                      </div>
                    </div>
                  )}

                  {userData.email && (
                    <div className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Email
                        </p>
                        <p className="text-gray-400 text-xs">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {userData.blog && (
                    <div className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-md rounded-xl p-3 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Website
                        </p>
                        <a
                          href={
                            userData.blog.startsWith("http")
                              ? userData.blog
                              : `https://${userData.blog}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200 text-xs underline"
                        >
                          {userData.blog}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col gap-4 min-w-fit">
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-purple-500/30 group transform hover:scale-105"
                >
                  <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>View Profile</span>
                </a>

                {userData.email && (
                  <a
                    href={`mailto:${userData.email}`}
                    className="flex items-center gap-3 px-8 py-4 bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white rounded-2xl font-bold text-lg transition-all duration-300 border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-md transform hover:scale-105"
                  >
                    <Mail className="w-6 h-6" />
                    <span>Contact</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GithubCard;
