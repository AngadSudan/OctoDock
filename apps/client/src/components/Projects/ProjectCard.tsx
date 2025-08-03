import { useState } from "react";
import {
  Github,
  Eye,
  Calendar,
  User,
  FolderOpen,
  GitBranch,
  MoreVertical,
  Code2,
  Zap,
  TrendingUp,
  Clock,
  X,
  FileText,
  MessageSquare,
  Folder,
  ExternalLink,
} from "lucide-react";

export interface Project {
  id: string;
  name: string;
  description: string;
  generatedPrompt: string;
  folderStructure: string;
  githubUrl?: string;
  status: "NOT_PUBLISHED" | "PUBLISHED" | "DRAFT";
  isActive: "ACTIVE" | "INACTIVE";
  createdBy: string;
  prompts?: string[];
  user?: {
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectCardProps {
  project: Project;
  isList?: boolean;
  onView?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onNavigate?: (projectId: string) => void; // New prop for navigation
}

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
          {activeTab === "description" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Project Description
                </h3>
                <p className="text-white/70 leading-relaxed text-base">
                  {project.description || "No description available."}
                </p>
              </div>

              {project.generatedPrompt && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Generated Prompt
                  </h3>
                  <div className="bg-white/[0.03] border border-white/[0.1] rounded-xl p-4 backdrop-blur-xl">
                    <p className="text-white/70 leading-relaxed text-sm font-mono whitespace-pre-wrap">
                      {project.generatedPrompt}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t border-white/[0.1]">
                <div className="text-sm text-white/60 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Created:{" "}
                  {project.createdAt
                    ? new Date(project.createdAt).toLocaleDateString()
                    : "Unknown"}
                </div>
                {project.updatedAt && (
                  <div className="text-sm text-white/60 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "prompts" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Project Prompts
              </h3>
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
          )}

          {activeTab === "structure" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Folder Structure
              </h3>
              {project.folderStructure ? (
                <div className="bg-white/[0.03] border border-white/[0.1] rounded-xl p-4 backdrop-blur-xl">
                  <pre className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
                    {project.folderStructure}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Folder className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/60">
                    No folder structure available for this project.
                  </p>
                </div>
              )}
            </div>
          )}
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

const ProjectCard = ({
  project,
  isList = false,
  onView,
  onEdit,
  onDelete,
  onNavigate,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAction = (action: () => void) => {
    setShowMenu(false);
    action();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on buttons or menu
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a")
    ) {
      return;
    }
    setShowModal(true);
  };

  const handleNavigateToProject = () => {
    if (onNavigate) {
      onNavigate(project.id);
    } else {
      window.location.href = `/project/${project.id}`;
    }
  };

  if (isList) {
    return (
      <>
        <div
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900/40 via-slate-900/40 to-gray-900/40 border border-white/[0.08] hover:border-white/[0.12] transition-all duration-700 backdrop-blur-2xl hover:shadow-2xl hover:shadow-black/20 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCardClick}
        >
          {/* Sleek gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.02] via-purple-500/[0.03] to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Modern glass morphism layer */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl" />

          <div className="relative p-6 flex items-center gap-6">
            {/* Ultra-modern project icon */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] flex items-center justify-center group-hover:scale-105 transition-all duration-500 backdrop-blur-xl shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-xl">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 -z-10" />
            </div>

            {/* Content with modern typography */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <h3 className="font-bold text-white text-xl truncate group-hover:text-white/95 transition-colors tracking-tight leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-white/60 text-sm mt-2 line-clamp-2 group-hover:text-white/70 transition-colors leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusBadge status={project.status} />
                    <div className="text-xs text-white/40 flex items-center gap-2 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "Recently"}
                    </div>
                    {project.user?.name && (
                      <div className="text-xs text-white/40 flex items-center gap-2 font-medium">
                        <User className="w-3.5 h-3.5" />
                        {project.user.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateToProject();
                    }}
                    className="p-3 rounded-2xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 hover:from-red-500/20 hover:via-purple-500/20 hover:to-blue-500/20 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
                  </button>

                  {onView && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(project);
                      }}
                      className="p-3 rounded-2xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 hover:from-red-500/20 hover:via-purple-500/20 hover:to-blue-500/20 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
                    >
                      <Zap className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
                    </button>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
                    >
                      <Github className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
                    </a>
                  )}

                  {/* Minimal actions menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(!showMenu);
                      }}
                      className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-xl"
                    >
                      <MoreVertical className="w-4 h-4 text-white/70" />
                    </button>

                    {showMenu && (
                      <div className="absolute right-0 top-full mt-3 w-56 bg-gray-900/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl z-50 overflow-hidden">
                        <div className="p-2">
                          <button
                            onClick={() =>
                              handleAction(() => setShowModal(true))
                            }
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button
                            onClick={() =>
                              handleAction(handleNavigateToProject)
                            }
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open Project
                          </button>
                          {onEdit && (
                            <button
                              onClick={() =>
                                handleAction(() => onEdit(project))
                              }
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                            >
                              <FolderOpen className="w-4 h-4" />
                              Edit Project
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() =>
                                handleAction(() => onDelete(project))
                              }
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/[0.08] rounded-xl transition-all duration-200"
                            >
                              <GitBranch className="w-4 h-4" />
                              Delete Project
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-thin accent line */}
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500/60 via-purple-500/60 to-blue-500/60 transition-all duration-700 ${isHovered ? "w-full opacity-100" : "w-0 opacity-0"}`}
          />
        </div>

        {/* Modal */}
        <ProjectModal
          project={project}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onNavigate={onNavigate}
        />
      </>
    );
  }

  return (
    <>
      <div
        className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900/40 via-slate-900/40 to-gray-900/40 border border-white/[0.08] hover:border-white/[0.12] transition-all duration-700 backdrop-blur-2xl hover:shadow-2xl hover:shadow-black/20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.02] via-purple-500/[0.03] to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Glass morphism layer */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl" />

        <div className="relative p-6 flex flex-col gap-6">
          {/* Project Icon */}
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] flex items-center justify-center group-hover:scale-105 transition-all duration-500 backdrop-blur-xl shadow-lg">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-xl">
                <Code2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-white text-xl group-hover:text-white/95 transition-colors tracking-tight">
                {project.name}
              </h3>
              <p className="text-white/60 text-sm mt-2 line-clamp-2 group-hover:text-white/70 transition-colors leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            {/* Status and Metadata */}
            <div className="flex flex-wrap items-center gap-4">
              <StatusBadge status={project.status} />
              <div className="text-xs text-white/40 flex items-center gap-2 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {project.createdAt
                  ? new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "Recently"}
              </div>
              {project.user?.name && (
                <div className="text-xs text-white/40 flex items-center gap-2 font-medium">
                  <User className="w-3.5 h-3.5" />
                  {project.user.name}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigateToProject();
                }}
                className="p-3 rounded-2xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 hover:from-red-500/20 hover:via-purple-500/20 hover:to-blue-500/20 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
              </button>

              {onView && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(project);
                  }}
                  className="p-3 rounded-2xl bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 hover:from-red-500/20 hover:via-purple-500/20 hover:to-blue-500/20 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
                </button>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
                >
                  <Github className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
                </a>
              )}

              {/* Actions Menu */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-xl"
                >
                  <MoreVertical className="w-4 h-4 text-white/70" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-gray-900/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-2">
                      <button
                        onClick={() => handleAction(() => setShowModal(true))}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleAction(handleNavigateToProject)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open Project
                      </button>
                      {onEdit && (
                        <button
                          onClick={() => handleAction(() => onEdit(project))}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                        >
                          <FolderOpen className="w-4 h-4" />
                          Edit Project
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => handleAction(() => onDelete(project))}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400/80 hover:text-red-300 hover:bg-red-500/[0.08] rounded-xl transition-all duration-200"
                        >
                          <GitBranch className="w-4 h-4" />
                          Delete Project
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Accent line */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500/60 via-purple-500/60 to-blue-500/60 transition-all duration-700 ${
            isHovered ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>

      {/* Modal */}
      <ProjectModal
        project={project}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
export default ProjectCard;
