import { useCreateProject } from "@/Hooks/api/project";
import React, { useEffect } from "react";
import logger from "@/lib/logger";

function PromptBar() {
  const { createProject, loading, data, error } = useCreateProject();
  useEffect(() => {
    logger.logData({message:String(loading)});
  });
  return <div>PromptBar</div>;
}

export default PromptBar;
