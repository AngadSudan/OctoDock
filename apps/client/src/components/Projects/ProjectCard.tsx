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
  user?: {
    name?: string;
    avatar?: string;
  };
  createdAt?: Date;
}

interface ProjectCardProps {
  project: Project;
  isList?: boolean;
  onView?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
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

const ProjectCard = ({
  project,
  isList = false,
  onView,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action: () => void) => {
    setShowMenu(false);
    action();
  };

  if (isList) {
    return (
      <div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900/40 via-slate-900/40 to-gray-900/40 border border-white/[0.08] hover:border-white/[0.12] transition-all duration-700 backdrop-blur-2xl hover:shadow-2xl hover:shadow-black/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
                {onView && (
                  <button
                    onClick={() => onView(project)}
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
                    className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <Github className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
                  </a>
                )}

                {/* Minimal actions menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <MoreVertical className="w-4 h-4 text-white/70" />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 top-full mt-3 w-56 bg-gray-900/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-2">
                        {onView && (
                          <button
                            onClick={() => handleAction(() => onView(project))}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        )}
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
    );
  }

  // Modern Card Layout
  return (
    <div
      className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900/40 via-slate-900/40 to-gray-900/40 border border-white/[0.08] hover:border-white/[0.12] transition-all duration-700 backdrop-blur-2xl hover:shadow-2xl hover:shadow-black/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            {onView && (
              <button
                onClick={() => onView(project)}
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
                className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 group/btn backdrop-blur-xl shadow-lg hover:shadow-xl"
              >
                <Github className="w-4 h-4 text-white/70 group-hover/btn:text-white" />
              </a>
            )}

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-xl"
              >
                <MoreVertical className="w-4 h-4 text-white/70" />
              </button>
              {/* Menu items (same as list view) */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-gray-900/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-2">
                    {/* ... (keep the existing menu items) ... */}
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
  );
};

export default ProjectCard;
