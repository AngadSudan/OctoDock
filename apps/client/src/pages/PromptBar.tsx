import { useCreateProject } from "@/Hooks/api/project";
import React, { useEffect } from "react";

function PromptBar() {
  const { createProject, loading, data, error } = useCreateProject();
  useEffect(() => {
    console.log(loading);
  });
  return <div>PromptBar</div>;
}

export default PromptBar;
