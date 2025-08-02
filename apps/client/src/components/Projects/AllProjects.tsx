import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  User,
  Calendar,
  GitBranch,
  Eye,
  Settings,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import ProjectCard from "./ProjectCard";
import OverlayFormModal from "./NewProjectForm";
import type { RootState } from "@/redux";
import { useSelector } from "react-redux";
import { useCreateProject, useGetAllProjectData } from "@/Hooks/api/project";
import { useNavigate } from "react-router";

function AllProjects() {
  const router = useNavigate();
  const [sampleProjects, setSampleProject] = useState([
    {
      id: "1",
      name: "Octodock Dashboard",
      description:
        "Next-generation project management platform with AI-powered insights, real-time collaboration, and seamless deployment workflows.",
      generatedPrompt: "Create a dashboard with analytics",
      folderStructure: "{}",
      githubUrl: "https://github.com/user/octodock-dashboard",
      status: "PUBLISHED",
      isActive: "ACTIVE",
      createdBy: "user1",
      user: { name: "John Doe" },
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "React Component System",
      description:
        "Advanced component library with TypeScript, comprehensive testing suite, Storybook documentation, and automated design system integration.",
      generatedPrompt: "Build a component library",
      folderStructure: "{}",
      status: "NOT_PUBLISHED",
      isActive: "ACTIVE",
      createdBy: "user2",
      user: { name: "Jane Smith" },
      createdAt: new Date("2024-02-20"),
    },
    {
      id: "3",
      name: "E-commerce Platform",
      description:
        "Full-stack marketplace solution featuring advanced payment processing, intelligent inventory management, and comprehensive analytics dashboard.",
      generatedPrompt: "Create an e-commerce platform",
      folderStructure: "{}",
      githubUrl: "https://github.com/user/ecommerce-platform",
      status: "DRAFT",
      isActive: "ACTIVE",
      createdBy: "user3",
      user: { name: "Alex Johnson" },
      createdAt: new Date("2024-03-10"),
    },
    {
      id: "4",
      name: "AI Content Generator",
      description:
        "Intelligent content creation tool with natural language processing, automated SEO optimization, and multi-platform publishing capabilities.",
      generatedPrompt: "Build an AI writing assistant",
      folderStructure: "{}",
      status: "PUBLISHED",
      isActive: "ACTIVE",
      createdBy: "user1",
      user: { name: "John Doe" },
      createdAt: new Date("2024-01-25"),
    },
    {
      id: "5",
      name: "Data Visualization Suite",
      description:
        "Comprehensive analytics platform with interactive charts, real-time data streaming, and customizable dashboard builder for business intelligence.",
      generatedPrompt: "Create data visualization tools",
      folderStructure: "{}",
      githubUrl: "https://github.com/user/data-viz-suite",
      status: "DRAFT",
      isActive: "ACTIVE",
      createdBy: "user2",
      user: { name: "Jane Smith" },
      createdAt: new Date("2024-03-05"),
    },
    {
      id: "6",
      name: "Mobile Chat Application",
      description:
        "Real-time messaging platform with end-to-end encryption, media sharing, group management, and cross-platform synchronization.",
      generatedPrompt: "Build a chat app",
      folderStructure: "{}",
      status: "NOT_PUBLISHED",
      isActive: "ACTIVE",
      createdBy: "user3",
      user: { name: "Alex Johnson" },
      createdAt: new Date("2024-02-10"),
    },
  ]);
  const [viewMode, setViewMode] = useState("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [authorFilter, setAuthorFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const uniqueAuthors = useMemo(() => {
    const authors = [...new Set(sampleProjects.map((p) => p.user.name))];
    return authors.sort();
  }, []);
  const userId = useSelector((state: RootState) => state.auth.user.login);
  const {
    data: projectsdata,
    loading: projectLoading,
    error: projectError,
  } = useGetAllProjectData(userId);
  useEffect(() => {
    if (!projectLoading && projectsdata) {
      setSampleProject(projectsdata.getAllUserProject);
      // console.log(projectsdata.getAllUserProject);
    }
  }, [projectsdata, projectLoading, projectError]);
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = sampleProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.user.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || project.status === statusFilter;
      const matchesAuthor =
        authorFilter === "ALL" || project.user.name === authorFilter;

      return matchesSearch && matchesStatus && matchesAuthor;
    });

    // Sort projects
    filtered.sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "author":
          aVal = a.user.name.toLowerCase();
          bVal = b.user.name.toLowerCase();
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        case "createdAt":
        default:
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [
    sampleProjects,
    searchQuery,
    statusFilter,
    authorFilter,
    sortBy,
    sortOrder,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    setAuthorFilter("ALL");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  const hasActiveFilters =
    searchQuery ||
    statusFilter !== "ALL" ||
    authorFilter !== "ALL" ||
    sortBy !== "createdAt" ||
    sortOrder !== "desc";
  const { createProject, loading, data, error } = useCreateProject();
  const handleSubmit = async (userId, project, details) => {
    try {
      const newProject = await createProject(userId, project, details);
      console.log("✅ Project created:", newProject);
      router(`/project/${newProject.id}`);
    } catch (err) {
      console.error("❌ Failed to create project:", err);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-950 to-black p-8">
      {newProject && (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center">
          <OverlayFormModal
            isOpen={newProject}
            onClose={() => setNewProject(false)}
            onSubmit={handleSubmit}
          />
        </div>
      )}
      <div className="fixed inset-0 bg-gradient-to-br from-red-500/[0.02] via-purple-500/[0.03] to-blue-500/[0.02] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.01),transparent_50%)] pointer-events-none" />

      <div className="relative z-0 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Projects
            </h1>
            <p className="text-white/60 text-xl font-medium">
              Build, deploy, and scale with confidence
            </p>
          </div>

          <button
            onClick={() => setNewProject(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 text-white border border-white/[0.1] rounded-2xl hover:bg-gradient-to-r hover:from-red-500/30 hover:via-purple-500/30 hover:to-blue-500/30 backdrop-blur-xl transition-all duration-300 shadow-lg"
          >
            <Plus size={20} />
            <span className="font-semibold">New Project</span>
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-8 space-y-4">
          {/* Main search and controls */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search projects, descriptions, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.06] backdrop-blur-xl transition-all duration-300"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-4 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                  showFilters || hasActiveFilters
                    ? "bg-white/[0.08] border border-white/[0.12] text-white"
                    : "bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white/80 hover:bg-white/[0.06]"
                }`}
              >
                <Filter size={20} />
                <span className="font-medium">Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Sort */}
              <div className="flex items-center gap-2 px-4 py-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl">
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc size={20} />
                  ) : (
                    <SortDesc size={20} />
                  )}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="createdAt" className="bg-gray-900">
                    Date Created
                  </option>
                  <option value="name" className="bg-gray-900">
                    Name
                  </option>
                  <option value="author" className="bg-gray-900">
                    Author
                  </option>
                  <option value="status" className="bg-gray-900">
                    Status
                  </option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 p-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl">
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    viewMode === "card"
                      ? "bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 text-white border border-white/[0.1]"
                      : "text-white/60 hover:text-white/80 hover:bg-white/[0.02]"
                  }`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 text-white border border-white/[0.1]"
                      : "text-white/60 hover:text-white/80 hover:bg-white/[0.02]"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-xl">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.06] backdrop-blur-xl"
                >
                  <option value="ALL" className="bg-gray-900">
                    All Statuses
                  </option>
                  <option value="PUBLISHED" className="bg-gray-900">
                    Published
                  </option>
                  <option value="DRAFT" className="bg-gray-900">
                    Draft
                  </option>
                  <option value="NOT_PUBLISHED" className="bg-gray-900">
                    Not Published
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Author
                </label>
                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.06] backdrop-blur-xl"
                >
                  <option value="ALL" className="bg-gray-900">
                    All Authors
                  </option>
                  {uniqueAuthors.map((author) => (
                    <option key={author} value={author} className="bg-gray-900">
                      {author}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-3 text-white/60 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all duration-200"
                  >
                    <X size={16} />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60">
            Showing{" "}
            <span className="text-white font-medium">
              {filteredAndSortedProjects.length}
            </span>{" "}
            of{" "}
            <span className="text-white font-medium">
              {sampleProjects.length}
            </span>{" "}
            projects
          </p>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-white/[0.05] border border-white/[0.08] rounded-lg text-white/80">
                  Search: "{searchQuery}"
                </span>
              )}
              {statusFilter !== "ALL" && (
                <span className="px-2 py-1 bg-white/[0.05] border border-white/[0.08] rounded-lg text-white/80">
                  Status: {statusFilter.replace("_", " ")}
                </span>
              )}
              {authorFilter !== "ALL" && (
                <span className="px-2 py-1 bg-white/[0.05] border border-white/[0.08] rounded-lg text-white/80">
                  Author: {authorFilter}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Projects Grid/List */}
        {filteredAndSortedProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/[0.03] border border-white/[0.08] rounded-3xl flex items-center justify-center backdrop-blur-xl">
              <Search className="text-white/40" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No projects found
            </h3>
            <p className="text-white/60 mb-6">
              {hasActiveFilters
                ? "Try adjusting your search criteria or clearing filters"
                : "Get started by creating your first project"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-white/[0.04] border border-white/[0.08] text-white rounded-2xl hover:bg-white/[0.06] backdrop-blur-xl transition-all duration-300"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "card"
                ? "grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8"
                : "space-y-4"
            }
          >
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project as any}
                isList={viewMode === "list"}
                onView={(project) => console.log("View:", project.name)}
                onEdit={(project) => console.log("Edit:", project.name)}
                onDelete={(project) => console.log("Delete:", project.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProjects;
