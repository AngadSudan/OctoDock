import { useEffect, useRef, useState } from "react";
import PromptBar from "./PromptBar";
import { useGetAllPrompt } from "@/Hooks/api/prompt";
import { useParams } from "react-router";
import CharCard from "./CharCard";

function Chat() {
  const currentRef = useRef(null);
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const { data, loading, error } = useGetAllPrompt(params.id);
  useEffect(() => {
    if (!loading && data !== undefined) {
      console.log(data);
      setMessages(data.getAllPromptPerProject);
    }
  }, [loading, data]);
  const scrollToView = () => {
    if (currentRef.current === null) return;
    currentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToView();
  }, [messages]);
  return (
    <div className="h-[110svh]  w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,75,75,0.1),transparent_70%)]"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Professional header */}
        <div className="px-6 py-2 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              <h1 className="text-slate-200 font-semibold text-sm tracking-wide">
                Chat
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-slate-900/30 rounded-full"></div>
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>

        {/* Chat messages area */}
        <div
          className="flex-1 p-6 space-y-6 overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            //@ts-ignore
            WebkitScrollbar: { display: "none" },
          }}
        >
          {messages.map((message, index) => {
            return (
              <div ref={currentRef}>
                <CharCard key={index} messages={[message]} />
              </div>
            );
          })}
        </div>

        {/* Professional prompt bar container */}
        <div className="p-6 mb-24 bg-slate-900/30 backdrop-blur-xl border-t border-slate-800/50">
          <PromptBar chat={messages} setChat={setMessages} />
        </div>
      </div>

      {/* Luxury ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
    </div>
  );
}

export default Chat;
