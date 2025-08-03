import {
  Calendar,
  Clock,
  Code2,
  ExternalLink,
  FileText,
  Folder,
  Github,
  MessageSquare,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import type { Project } from "./ProjectCard";
import { useState } from "react";
import Description from "./Description";
import Prompts from "./prompts";
import Structure from "./Structure";
const StatusBadge = ({ status }: { status: Project["status"] }) => {
  const statusConfig = {
    PUBLISHED: {
      label: "Live",
      icon: TrendingUp,
      gradient: "bg-gradient-to-r from-emerald-400/10 to-green-400/10",
      border: "border-emerald-400/20",
      text: "text-emerald-300",
      glow: "shadow-emerald-400/20",
    },
    NOT_PUBLISHED: {
      label: "Draft",
      icon: Clock,
      gradient: "bg-gradient-to-r from-amber-400/10 to-orange-400/10",
      border: "border-amber-400/20",
      text: "text-amber-300",
      glow: "shadow-amber-400/20",
    },
    DRAFT: {
      label: "Draft",
      icon: Clock,
      gradient: "bg-gradient-to-r from-slate-400/10 to-gray-400/10",
      border: "border-slate-400/20",
      text: "text-slate-300",
      glow: "shadow-slate-400/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md ${config.gradient} ${config.border} ${config.text} ${config.glow} shadow-lg`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </div>
  );
};
const ProjectModal = ({
  project,
  isOpen,
  onClose,
  onNavigate,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (projectId: string) => void;
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "prompts" | "structure"
  >("description");

  if (!isOpen) return null;

  const tabs = [
    { id: "description", label: "Description", icon: FileText },
    { id: "prompts", label: "Prompts", icon: MessageSquare },
    { id: "structure", label: "Structure", icon: Folder },
  ];

  const handleNavigateToProject = () => {
    onClose();
    if (onNavigate) {
      onNavigate(project.id);
    } else {
      // Fallback to window.location if no navigate function provided
      window.location.href = `/project/${project.id}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-lg"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] m-4 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-gray-900/95 backdrop-blur-2xl border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.1]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] flex items-center justify-center backdrop-blur-xl shadow-lg">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-xl">
                  <Code2 className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {project.name}
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <StatusBadge status={project.status} />
                  {project.user?.name && (
                    <div className="text-sm text-white/60 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {project.user.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNavigateToProject}
                className="px-4 py-2 bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 hover:from-red-500/30 hover:via-purple-500/30 hover:to-blue-500/30 border border-white/[0.1] hover:border-white/[0.2] rounded-xl text-white font-medium text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur-xl"
              >
                <ExternalLink className="w-4 h-4" />
                Open Project
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] transition-all duration-300 backdrop-blur-xl"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.1] bg-white/[0.02]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "text-white bg-white/[0.05] border-b-2 border-white/[0.3]"
                    : "text-white/60 hover:text-white/80 hover:bg-white/[0.02]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === "description" && <Description project={project} />}

          {activeTab === "prompts" && <Prompts project={project} />}

          {activeTab === "structure" && <Structure project={project} />}
        </div>

        {/* Footer */}
        {project.githubUrl && (
          <div className="p-6 border-t border-white/[0.1] bg-white/[0.02]">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] rounded-xl text-white/80 hover:text-white text-sm font-medium transition-all duration-300 backdrop-blur-xl"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
