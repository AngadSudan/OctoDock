import React, { useState, useRef, useEffect } from "react";

function PromptBar() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsTyping(true);
      // Simulate sending message
      console.log("Sending message:", message);
      setMessage("");

      // Simulate response delay
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-purple-500/20 rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative flex items-end p-4 space-x-3">
            {/* Attachment button */}
            <button
              type="button"
              className="flex-shrink-0 w-10 h-10 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30 rounded-xl flex items-center justify-center transition-all duration-200 group"
            >
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            {/* Message input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Message Claude..."
                className="w-full bg-transparent text-slate-200 placeholder-slate-400 resize-none outline-none text-sm leading-relaxed max-h-48 min-h-[44px] py-3 px-4 rounded-xl focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
                style={{
                  height: "44px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#475569 transparent",
                }}
                disabled={isTyping}
              />

              {/* Character count (optional) */}
              {message.length > 0 && (
                <div className="absolute bottom-1 right-2 text-xs text-slate-500">
                  {message.length}
                </div>
              )}
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                message.trim() && !isTyping
                  ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg"
                  : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
              }`}
            >
              {isTyping ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-5 h-5"
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

        {/* Suggestions/Quick actions */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          <button
            type="button"
            onClick={() => setMessage("Explain this code:")}
            className="px-3 py-1.5 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 rounded-lg text-slate-400 hover:text-slate-300 text-xs font-medium transition-all duration-200"
          >
            Explain code
          </button>
          <button
            type="button"
            onClick={() => setMessage("Help me debug this:")}
            className="px-3 py-1.5 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 rounded-lg text-slate-400 hover:text-slate-300 text-xs font-medium transition-all duration-200"
          >
            Debug
          </button>
          <button
            type="button"
            onClick={() => setMessage("Create a new component:")}
            className="px-3 py-1.5 bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 rounded-lg text-slate-400 hover:text-slate-300 text-xs font-medium transition-all duration-200"
          >
            New component
          </button>
        </div>

        {/* Footer text */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            Claude can make mistakes. Please verify important information.
          </p>
        </div>
      </form>
    </div>
  );
}

export default PromptBar;
