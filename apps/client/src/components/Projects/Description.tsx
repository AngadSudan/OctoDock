import { Calendar, Clock, FileText, Code2, Sparkles } from "lucide-react";
import React from "react";

function Description({ project }) {
  const displayProject = project;

  return (
    <div className="min-h-fit bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className=" space-y-6">
        {/* Software Requirement Specification */}
        {displayProject.generatedPrompt && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-indigo-600/5 to-blue-600/5 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl backdrop-blur-3xl"></div>

            <div className="relative bg-white/[0.02] rounded-3xl border border-white/[0.08] shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Content with hidden scrollbar */}
              <div className="p-8">
                <div
                  className="max-h-96 overflow-y-scroll pr-4"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    //@ts-ignore
                    WebkitScrollbar: { display: "none" },
                  }}
                >
                  <style>{`
                    div::-webkit-scrollbar {
                      display: none;
                      scroll-behavior: smooth;
                    }
                  `}</style>
                  <div className="space-y-8">
                    {displayProject.generatedPrompt
                      .split("\n\n")
                      .map((section, index) => {
                        const lines = section.split("\n");
                        const title = lines[0];
                        const content = lines.slice(1);

                        return (
                          <div key={index} className="group">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
                              <h3 className="text-lg font-semibold text-white/95 tracking-tight">
                                {title}
                              </h3>
                            </div>

                            <div className="ml-5 space-y-2">
                              {content.map((line, lineIndex) => (
                                <div key={lineIndex} className="">
                                  {line.startsWith("- ") ? (
                                    <div className="flex items-start gap-3 py-1">
                                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 flex-shrink-0 opacity-60"></div>
                                      <span className="text-slate-300 leading-relaxed ">
                                        {line.substring(2)}
                                      </span>
                                    </div>
                                  ) : line.trim() ? (
                                    <div className="text-slate-200 font-medium py-1 leading-relaxed">
                                      {line}
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Subtle fade indicator */}
                <div className="absolute bottom-8 left-8 right-8 h-8 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none rounded-b-3xl"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Description;
