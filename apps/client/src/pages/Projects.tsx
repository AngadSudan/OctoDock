import ProjectsIndex from "@/components/Projects/ProjectsIndex";
import React from "react";
import { Helmet } from "react-helmet";
function Projects() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Octodock – Development Workspace</title>

        <meta
          name="description"
          content="Access your Octodock dashboard to monitor environments, manage containerized workflows, track distributed compute usage, and oversee automated deployment orchestration."
        />

        {/* Authenticated pages should not be indexed */}
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph Meta */}
        <meta
          property="og:title"
          content="Octodock Dashboard – Your Development Control Center"
        />
        <meta
          property="og:description"
          content="Manage your development environments, workflows, and deployment pipelines within the Octodock dashboard."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Octodock" />
      </Helmet>

      <ProjectsIndex />
    </>
  );
}

export default Projects;
