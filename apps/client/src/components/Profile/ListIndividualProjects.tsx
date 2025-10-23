import React, { useEffect, useState } from "react";
import type { RootState } from "@/redux";
import { useSelector } from "react-redux";
import { useCreateProject, useGetAllProjectData } from "@/Hooks/api/project";
import { Link, useNavigate } from "react-router";
import { Search } from "lucide-react";
import ProjectCard from "../Projects/ProjectCard";
import type { project } from "../Projects/AllProjects";

function ListIndividualProjects() {
  const router = useNavigate();
  const [sampleProjects, setSampleProject] = useState<project[]>([]);
  const [viewMode, setViewMode] = useState("card");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  let userId;
  if (!isAuthenticated) {
    router("/login");
  } else {
    userId = useSelector((state: RootState) => state.auth.user.login);
  }
  const {
    data: projectsdata,
    loading: projectLoading,
    error: projectError,
  } = useGetAllProjectData(userId);
  useEffect(() => {
    if (!projectLoading && projectsdata) {
      setSampleProject(projectsdata.getAllUserProject || []);
    }
  }, [projectsdata, projectLoading, projectError]);

  return (
    <div>
      {sampleProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/[0.03] border border-white/[0.08] rounded-3xl flex items-center justify-center backdrop-blur-xl">
            <Search className="text-white/40" size={32} />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            No projects found
          </h3>
        </div>
      ) : (
        <div
          className={
            viewMode === "card"
              ? "grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8"
              : "space-y-4"
          }
        >
          {sampleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project as any}
              isList={viewMode === "list"}
              onView={(project) => {}}
              onEdit={(project) => {}}
              onDelete={(project) => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListIndividualProjects;
