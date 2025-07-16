import PromptBar from "./PromptBar";

function Chat() {
  return (
    <div className="min-h-screen w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,75,75,0.1),transparent_70%)]"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Professional header */}
        <div className="px-6 py-4 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              <h1 className="text-slate-200 font-semibold text-sm tracking-wide">
                Chat
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Assistant message */}
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center border border-slate-600/50">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            <div className="flex-1 max-w-2xl">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-2xl">
                <p className="text-slate-200 text-sm leading-relaxed">
                  Welcome to your development environment. I'm here to help you
                  build, debug, and deploy your applications with precision and
                  efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* User message */}
          <div className="flex items-start space-x-4 justify-end">
            <div className="flex-1 max-w-2xl">
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/20 rounded-xl p-4 shadow-2xl ml-auto">
                <p className="text-slate-100 text-sm leading-relaxed">
                  I need to implement a new feature for my React application.
                  Can you help me set up the component structure?
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white/90 rounded-full"></div>
            </div>
          </div>

          {/* Assistant message with code preview */}
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg flex items-center justify-center border border-slate-600/50">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            <div className="flex-1 max-w-2xl">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 shadow-2xl">
                <p className="text-slate-200 text-sm leading-relaxed mb-3">
                  I'll help you create a professional component structure.
                  Here's a clean, scalable approach:
                </p>
                <div className="bg-slate-900/60 border border-slate-700/30 rounded-lg p-3 text-xs font-mono">
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-slate-200">MyComponent</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-yellow-400">() =&gt; {"{"}</span>
                  <br />
                  <span className="text-slate-400 ml-2">
                    // Your component logic here
                  </span>
                  <br />
                  <span className="text-yellow-400">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional prompt bar container */}
        <div className="p-6 bg-slate-900/30 backdrop-blur-xl border-t border-slate-800/50">
          <div className="relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-1 shadow-2xl">
              <PromptBar />
            </div>
          </div>
        </div>
      </div>

      {/* Luxury ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
    </div>
  );
}

export default Chat;
