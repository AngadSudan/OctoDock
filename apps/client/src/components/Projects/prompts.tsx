import { MessageSquare } from "lucide-react";
import React from "react";

function Prompts({ project }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-3">Project Prompts</h3>
      {project.prompts && project.prompts.length > 0 ? (
        <div className="space-y-3">
          {project.prompts.map((prompt, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/[0.1] rounded-xl p-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-white/60" />
                <span className="text-sm font-medium text-white/80">
                  Prompt {index + 1}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                {prompt}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/60">
            No prompts available for this project.
          </p>
        </div>
      )}
    </div>
  );
}

export default Prompts;
