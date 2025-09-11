"use client";

import { useEffect } from "react";

import {
  FileText,
  Code,
  CheckCircle,
  XCircle,
  Loader,
  Clock,
  Bot,
  User,
} from "lucide-react";

const ChatCard = ({ ref, messages }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scrollToView = () => {
    if (!ref || ref.current === null) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToView();
  }, [messages]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-3 h-3  text-emerald-400" />;
      case "failure":
        return <XCircle className="w-3 h-3  text-red-400" />;
      case "loading":
        return <Loader className="w-3 h-3  text-blue-400 animate-spin" />;
      case "processing":
        return <Clock className="w-3 h-3  text-orange-400" />;
      default:
        return <FileText className="w-3 h-3  text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20";
      case "failure":
        return "bg-red-500/10 text-red-300 border border-red-500/20";
      case "loading":
        return "bg-blue-500/10 text-blue-300 border border-blue-500/20";
      case "processing":
        return "bg-orange-500/10 text-orange-300 border border-orange-500/20";
      default:
        return "bg-slate-500/10 text-slate-300 border border-slate-500/20";
    }
  };

  const renderCodeFiles = (codeArray) => {
    if (!codeArray || codeArray.length === 0) return null;

    return (
      <div className="mt-4">
        <div className="flex items-center mb-3">
          <Code className="w-4 h-4 mr-2 text-orange-400" />
          <h4 className="text-sm font-semibold text-slate-200">
            Generated Files
          </h4>
          <div className="ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
            {Object.keys(codeArray).length}
          </div>
        </div>
        <div className="space-y-2">
          {Object.keys(codeArray).map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between transition-colors rounded-lg px-3 border border-slate-700/50"
            >
              <div className="flex items-center">
                <div className="flex items-center space-x-3">
                  <div
                    className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(codeArray[file])}`}
                  >
                    {getStatusIcon(codeArray[file])}
                  </div>
                </div>
                <span className="text-[12px] ml-2 font-medium text-slate-200 font-mono">
                  {file}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  if (messages.length > 0) {
    console.log({ message: "messages to be displayed are " + messages[0] });
  }
  return (
    <div className="flex flex-col space-y-6 p-6 bg-slate-950/30 min-h-screen">
      {messages.map((chatMessage, index) => (
        <div key={index} className="space-y-4">
          {chatMessage.role === "USER" && (
            <div className="flex justify-end">
              <div className="max-w-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-2xl rounded-tr-md px-5 py-4 shadow-xl border border-blue-500/20">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-relaxed">
                      {chatMessage.message}
                    </p>
                    <p className="text-xs text-blue-200 mt-2 opacity-75">
                      {formatTime(chatMessage.timestamp || new Date())}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chatMessage.role === "SYSTEM" && (
            <div className="flex justify-start">
              <div className="max-w-4xl text-white bg-slate-900/80 backdrop-blur-sm rounded-2xl rounded-tl-md px-5 py-4 shadow-xl border border-slate-700/50">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-3">
                      <h3 className="text-sm font-semibold text-slate-100">
                        OctoDock AI
                      </h3>
                      <div className="ml-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>

                    <div className="space-y-4">
                      {/* System Response */}
                      <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                          Response
                        </h4>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {chatMessage.systemResponse || chatMessage.message}
                        </p>
                      </div>

                      {/* Code Files */}
                      {renderCodeFiles(chatMessage.code)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    {chatMessage.code &&
                      Object.keys(chatMessage.code).length > 0 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                          <span className="text-xs text-slate-400 font-medium">
                            {Object.keys(chatMessage.code).length} file
                            {Object.keys(chatMessage.code).length !== 1
                              ? "s"
                              : ""}{" "}
                            generated
                          </span>
                        </div>
                      )}
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    {formatTime(chatMessage.timestamp || new Date())}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {/* <div ref={ref} /> */}
    </div>
  );
};

export default ChatCard;
