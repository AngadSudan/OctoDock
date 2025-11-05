import configuration from "@/conf/configuration";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import {
  Terminal,
  Activity,
  Server,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Minimize2,
  Square,
  Play,
} from "lucide-react";

function Deployment() {
  const param = useParams();
  const [deploymetLog, setDeploymentLog] = useState([
    { log: "Starting deployment process...", timestamp: new Date() },
    { log: "Building application...", timestamp: new Date() },
    { log: "Installing dependencies...", timestamp: new Date() },
    { log: "Running build scripts...", timestamp: new Date() },
    { log: "Optimizing assets...", timestamp: new Date() },
    { log: "Deploying to production...", timestamp: new Date() },
    { log: "Deployment successful!", timestamp: new Date() },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    console.log(
      configuration.builder_server + "/deployment-logs?projectId=" + param.id
    );
    const eventSource = new EventSource(
      configuration.builder_server + "/deployment-logs?projectId=" + param.id
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setDeploymentLog(data.data);
    };

    eventSource.onerror = (error) => {
      console.log("An SSE error occurred:");
      console.error(error);
    };
    return () => eventSource.close();
  }, []);

  // Get last 10 logs for display
  const visibleLogs = deploymetLog;
  const hasLogs = visibleLogs.length > 0;
  const lastLog = visibleLogs[0];
  const isSuccess = lastLog?.log?.toLowerCase().includes("success");
  const isError =
    lastLog?.log?.toLowerCase().includes("error") ||
    lastLog?.log?.toLowerCase().includes("failed");

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-red-900/20" />

      {/* Floating particles */}
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

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black/80 backdrop-blur-md border-b border-red-400/30 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Server size={24} className="text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-white">
                  Deployment Monitor
                </h1>
                <p className="text-gray-400 text-sm font-mono">
                  OCTODOCK.DEPLOYMENT.SYSTEM
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-red-400 font-mono text-sm">
                {currentTime.toTimeString().split(" ")[0]}
              </div>
              <div className="text-gray-500 text-xs">
                {currentTime.toDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-xl p-6 hover:border-red-400/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <Activity size={20} className="text-red-400" />
                <div
                  className={`w-2 h-2 rounded-full ${isError ? "bg-red-500" : isSuccess ? "bg-green-500" : "bg-yellow-500"} animate-pulse`}
                />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {isError ? "Failed" : isSuccess ? "Success" : "Building"}
              </div>
              <div className="text-gray-400 text-sm font-mono">
                Deployment Status
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-xl p-6 hover:border-red-400/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <Terminal size={20} className="text-blue-400" />
                <Zap size={16} className="text-yellow-400 animate-pulse" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {deploymetLog.length}
              </div>
              <div className="text-gray-400 text-sm font-mono">Total Logs</div>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-red-400/30 rounded-xl p-6 hover:border-red-400/60 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <Clock size={20} className="text-green-400" />
                {isSuccess ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : (
                  <Activity
                    size={16}
                    className="text-yellow-400 animate-spin"
                  />
                )}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {isSuccess ? "Complete" : "In Progress"}
              </div>
              <div className="text-gray-400 text-sm font-mono">Build Phase</div>
            </div>
          </div>

          {/* Terminal Window */}
          <div className="relative bg-black/80 backdrop-blur-md border border-red-400/30 rounded-2xl overflow-hidden shadow-2xl shadow-red-400/10">
            {/* Terminal Header */}
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
                    Deployment Logs - Last 10 Entries
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="hover:bg-red-400/20 p-1 rounded transition-colors">
                  <Minimize2
                    size={16}
                    className="text-gray-400 hover:text-red-400"
                  />
                </button>
                <button className="hover:bg-red-400/20 p-1 rounded transition-colors">
                  <Square
                    size={16}
                    className="text-gray-400 hover:text-red-400"
                  />
                </button>
                <button className="hover:bg-green-400/20 p-1 rounded transition-colors">
                  <Play size={16} className="text-green-400" />
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 h-96 overflow-auto">
              {!hasLogs ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <Terminal size={48} className="text-gray-600 mx-auto" />
                    <div className="text-gray-500 font-mono text-sm">
                      Waiting for deployment logs...
                    </div>
                    <div className="flex items-center justify-center space-x-2">
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
                </div>
              ) : (
                <div className="space-y-2">
                  {visibleLogs.map((logEntry, index) => {
                    const isErrorLog =
                      logEntry.log?.toLowerCase().includes("error") ||
                      logEntry.log?.toLowerCase().includes("failed");
                    const isSuccessLog =
                      logEntry.log?.toLowerCase().includes("success") ||
                      logEntry.log?.toLowerCase().includes("complete");
                    const isWarningLog = logEntry.log
                      ?.toLowerCase()
                      .includes("warning");

                    return (
                      <div
                        key={index}
                        className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 animate-fadeIn"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Log Icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {isErrorLog ? (
                            <XCircle size={16} className="text-red-400" />
                          ) : isSuccessLog ? (
                            <CheckCircle size={16} className="text-green-400" />
                          ) : (
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                          )}
                        </div>

                        {/* Log Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {logEntry.timestamp && (
                              <span className="text-gray-600 font-mono text-xs">
                                {new Date(
                                  logEntry.timestamp
                                ).toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                          <div
                            className={`font-mono text-sm break-words ${
                              isErrorLog
                                ? "text-red-400"
                                : isSuccessLog
                                  ? "text-green-400"
                                  : isWarningLog
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                          >
                            {logEntry.log}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {/* Terminal glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Info Banner */}
          <div className="mt-6 bg-black/40 backdrop-blur-md border border-red-400/20 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Terminal size={20} className="text-red-400 flex-shrink-0" />
              <div className="text-gray-400 font-mono text-sm">
                Real-time deployment logs • Showing last 10 entries •
                Auto-updating via Server-Sent Events
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(248, 113, 113, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(248, 113, 113, 0.8);
        }
      `}</style>
    </div>
  );
}

export default Deployment;
