import StackBlitzIndex from "@/components/StackBlitz/StackBlitzIndex";
import React from "react";
import { Helmet } from "react-helmet";
function Project() {
  return (
    <>
      <Helmet>
        <title>Project Overview | Octodock</title>

        <meta
          name="description"
          content="View detailed insights for this Octodock project, including containerized environments, deployment pipelines, resource usage, and distributed compute operations."
        />

        {/* Protect private project content */}
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph */}
        <meta property="og:title" content="Octodock Project Overview" />
        <meta
          property="og:description"
          content="Access project details, monitor orchestrated workflows, and manage deployments within the Octodock distributed development ecosystem."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Octodock" />
      </Helmet>

      <div>
        <StackBlitzIndex />
      </div>
    </>
  );
}

export default Project;
