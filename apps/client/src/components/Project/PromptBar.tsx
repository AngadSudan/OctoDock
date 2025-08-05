import { useCreatePrompt } from "@/Hooks/api/prompt";
import type { RootState } from "@/redux";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function PromptBar({ chat, setChat }) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const textareaRef = useRef(null);
  // const { createPrompt, data, loading, error } = useCreatePrompt();
  const user = useSelector((state: RootState) => state.auth);
  const param = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsTyping(true);
      console.log("Sending message:", message);
      setMessage("");
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
      if (!user.isAuthenticated) {
        return;
      }
      //TODO: add gql query to handle the prompt registrations
      // const response = await createPrompt(user.user.login, param.id, message);
      // if (response) {
      //   setMessage("");
      // }
      setChat([...chat, { message }]);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const suggestions = [
    "Explain this code",
    "Help me debug this",
    "Create a new component",
    "Optimize this function",
    "Add documentation for",
    "Convert this to TypeScript",
    "Refactor this code",
    "Add error handling to",
    "Write unit tests for",
    "Improve performance of",
  ];

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(message.toLowerCase()) &&
      message.trim() !== ""
  );

  const handleKeyDown = (e) => {
    if (showSuggestions && filteredSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        return;
      }
      if (e.key === "Tab" && selectedSuggestion >= 0) {
        e.preventDefault();
        applySuggestion(filteredSuggestions[selectedSuggestion]);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showSuggestions && selectedSuggestion >= 0) {
        applySuggestion(filteredSuggestions[selectedSuggestion]);
      } else {
        handleSubmit(e);
      }
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
      textareaRef.current?.blur();
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setMessage(value);
    setSelectedSuggestion(-1);

    // Show suggestions when typing
    if (value.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (message.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow clicking
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }, 150);
  };

  const applySuggestion = (suggestion) => {
    setMessage(suggestion + ": ");
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <div className="relative">
        {/* Discord-style suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 mb-2 z-50">
            <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-lg shadow-2xl max-h-48 overflow-y-auto">
              {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => applySuggestion(suggestion)}
                  onMouseEnter={() => setSelectedSuggestion(index)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                    selectedSuggestion === index
                      ? "bg-blue-500/20 text-blue-300"
                      : "text-gray-300 hover:bg-slate-700/50"
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main input container */}
        <div
          className={`relative transition-all duration-300 ${isFocused ? "transform -translate-y-1" : ""}`}
        >
          {/* Animated background layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-gray-900/70 to-slate-900/60 rounded-3xl backdrop-blur-xl" />

          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-pink-500/20 rounded-3xl blur-xl opacity-0 transition-opacity duration-300 ${isFocused ? "opacity-100" : ""}`}
          />

          {/* Border gradient */}
          <div
            className={`absolute inset-0 rounded-3xl transition-all duration-300 ${isFocused ? "bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 p-[1px]" : "bg-gradient-to-r from-white/10 to-white/5 p-[1px]"}`}
          >
            <div className="h-full w-full bg-slate-900/80 rounded-3xl" />
          </div>

          <div className="relative flex items-end p-6 gap-4">
            {/* Enhanced message input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Ask Claude anything..."
                className="w-full bg-transparent text-white placeholder-white/50 resize-none outline-none text-base leading-relaxed max-h-48 min-h-[56px] py-4 px-6 rounded-2xl transition-all duration-300 font-medium"
                style={{
                  height: "56px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#64748b transparent",
                }}
                disabled={isTyping}
              />

              {/* Enhanced character count */}
              {message.length > 0 && (
                <div
                  className={`absolute bottom-2 right-3 text-xs transition-colors duration-200 ${message.length > 500 ? "text-amber-400" : "text-white/40"}`}
                >
                  {message.length}
                </div>
              )}

              {/* Typing indicator overlay */}
              {isTyping && (
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      Octadock is thinking...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!message.trim() || isTyping}
              className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                message.trim() && !isTyping
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl shadow-purple-500/25"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              {isTyping ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        {isFocused && !isTyping && (
          <div className="absolute top-full left-0 right-0 mt-2 flex items-center justify-center">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
              <div className="flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                    Enter
                  </kbd>
                  to send
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                    Tab
                  </kbd>
                  to autocomplete
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                    ↑↓
                  </kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/10 rounded text-xs">
                    Esc
                  </kbd>
                  to close
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PromptBar;
