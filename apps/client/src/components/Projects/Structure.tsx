import {
  Folder,
  FolderOpen,
  File,
  Code,
  Database,
  Settings,
  Shield,
  Globe,
  ChevronRight,
  ChevronDown,
  Github,
} from "lucide-react";
import React, { useState, useMemo } from "react";

function Structure({ project }) {
  const [expandedFolders, setExpandedFolders] = useState(new Set(["src"]));

  // Sample data based on your provided structure
  const sampleStructure = `{"src/index.js":"string","src/config/index.js":"string","src/utils/logger.js":"string","src/utils/errorHandler.js":"string","src/middleware/authMiddleware.js":"string","src/middleware/rateLimitMiddleware.js":"string","src/routes/authRoutes.js":"string","src/routes/todoRoutes.js":"string","src/routes/tagRoutes.js":"string","src/controllers/authController.js":"string","src/controllers/todoController.js":"string","src/controllers/tagController.js":"string","src/models/User.js":"string","src/models/TodoItem.js":"string","src/models/Tag.js":"string","src/services/userService.js":"string","src/services/todoService.js":"string","src/services/tagService.js":"string","src/db/mongoose.js":"string"}`;

  const folderStructure = project?.folderStructure || sampleStructure;

  // Parse the folder structure into a tree
  const fileTree = useMemo(() => {
    try {
      const structure = JSON.parse(folderStructure);
      const tree = {};

      Object.keys(structure).forEach((path) => {
        const parts = path.split("/");
        let current = tree;

        parts.forEach((part, index) => {
          if (!current[part]) {
            current[part] = {
              type: index === parts.length - 1 ? "file" : "folder",
              children: {},
              path: parts.slice(0, index + 1).join("/"),
            };
          }
          current = current[part].children;
        });
      });

      return tree;
    } catch (error) {
      return {};
    }
  }, [folderStructure]);

  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    const name = filename.toLowerCase();

    if (name.includes("config") || name.includes("index")) return Settings;
    if (name.includes("middleware") || name.includes("auth")) return Shield;
    if (name.includes("route") || name.includes("controller")) return Globe;
    if (
      name.includes("model") ||
      name.includes("db") ||
      name.includes("mongoose")
    )
      return Database;
    if (ext === "js" || ext === "ts") return Code;
    return File;
  };

  const getFileColor = (filename) => {
    const name = filename.toLowerCase();

    if (name.includes("config")) return "text-amber-400";
    if (name.includes("middleware") || name.includes("auth"))
      return "text-emerald-400";
    if (name.includes("route")) return "text-blue-400";
    if (name.includes("controller")) return "text-purple-400";
    if (name.includes("model")) return "text-pink-400";
    if (name.includes("service")) return "text-cyan-400";
    if (name.includes("db") || name.includes("mongoose"))
      return "text-orange-400";
    if (name.includes("util")) return "text-green-400";
    return "text-slate-400";
  };

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderTree = (node, name, level = 0, path = "") => {
    const currentPath = path ? `${path}/${name}` : name;
    const isExpanded = expandedFolders.has(currentPath);
    const hasChildren = Object.keys(node.children || {}).length > 0;

    if (node.type === "file") {
      const IconComponent = getFileIcon(name);
      const colorClass = getFileColor(name);

      return (
        <div
          key={currentPath}
          className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/[0.05] transition-all duration-200 group cursor-pointer ${level > 0 ? "ml-6" : ""}`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          <IconComponent
            className={`w-4 h-4 ${colorClass} group-hover:scale-110 transition-transform duration-200`}
          />
          <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-200 font-medium">
            {name}
          </span>
        </div>
      );
    }

    return (
      <div key={currentPath}>
        <div
          className={`flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/[0.05] transition-all duration-200 group cursor-pointer ${level > 0 ? "ml-6" : ""}`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => hasChildren && toggleFolder(currentPath)}
        >
          {hasChildren && (
            <div className="w-4 h-4 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-200" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors duration-200" />
              )}
            </div>
          )}
          {!hasChildren && <div className="w-4 h-4" />}

          {isExpanded || !hasChildren ? (
            <FolderOpen className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
          ) : (
            <Folder className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
          )}

          <span className="text-sm text-slate-200 group-hover:text-white transition-colors duration-200 font-semibold">
            {name}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="overflow-hidden">
            <div className="animate-fadeIn">
              {Object.entries(node.children).map(([childName, childNode]) =>
                renderTree(childNode, childName, level + 1, currentPath)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl h-fit overflow-y-scroll mx-auto space-y-6">
        {/* File Tree Section */}
        {Object.keys(fileTree).length > 0 ? (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-3xl backdrop-blur-3xl"></div>

            <div className="relative bg-white/[0.02] rounded-3xl border border-white/[0.08] shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Tree Header */}
              <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 p-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="ml-4 text-sm font-medium text-slate-400">
                    File Explorer
                  </span>
                </div>
              </div>

              {/* Tree Content */}
              <div className="p-6">
                <div
                  className="max-h-96 overflow-y-scroll space-y-1"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <style>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                    @keyframes fadeIn {
                      from {
                        opacity: 0;
                        transform: translateY(-10px);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }
                    .animate-fadeIn {
                      animation: fadeIn 0.3s ease-out;
                    }
                  `}</style>

                  {Object.entries(fileTree).map(([name, node]) =>
                    renderTree(node, name)
                  )}
                </div>

                {/* Fade indicator for scrollable content */}
                <div className="absolute bottom-6 left-6 right-6 h-8 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none rounded-b-3xl"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-slate-700/20 rounded-3xl"></div>
            <div className="relative bg-white/[0.02] rounded-3xl border border-white/[0.08] p-12 shadow-2xl backdrop-blur-xl text-center">
              <Folder className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-slate-400 mb-2">
                No Structure Available
              </h3>
              <p className="text-slate-500">
                The folder structure for this project hasn't been generated yet.
              </p>
            </div>
          </div>
        )}

        {/* GitHub Link */}
        <div className="flex justify-center">
          <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 backdrop-blur-xl">
            <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
            <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
              View on GitHub
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Structure;
