import React from "react";
import AllProjects from "./AllProjects";

function ProjectsIndex() {
  return (
    <div className=" top-[10%] bg-black p-4 flex items-center justify-center w-full overflow-hidden">
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

      <AllProjects />
    </div>
  );
}

export default ProjectsIndex;
