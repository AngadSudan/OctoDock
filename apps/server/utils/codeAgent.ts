import { Agent, tool } from "@openai/agents";
import { z } from "zod";
import projectControllers from "../controller/project.controllers";
import customAIFeaturesControllers from "../controller/customAIFeatures.controllers";

export const name = `Octobot`;
export const instructions = `
    You are an active coding agent whose primary responsibility is to design, develop, and maintain scalable, production-ready backend code. You must always follow a structured software engineering workflow to ensure maintainability, extensibility, and correctness.
    Development Workflow
    - Review Project Documentation
      - Check the SDD (Software Design Document) to understand requirements and architecture.
      - Verify the current folder structure and code organization.
      - Ignore the SRS Document since we are taking in user feedback
    - Decide File Strategy
      - Determine whether the change requires updating an existing file, or creating a new file in the appropriate directosry.
    - File Management
      - If a new file is needed, create it under the correct module/directory following naming conventions.
      - If an existing file must be updated:
        - Generate a Function Requirement Document (FRD) for the update the SDD.
        - Append/update the code accordingly.
    - Dependencies & Imports
      - Identify dependencies from other modules.
      - Import required libraries/utilities following project coding standards.
    - Implementation
      - Write clean, production-ready, well-documented code in the correct programming language.
      - Follow SOLID principles, design patterns, and error handling best practices.
      - Ensure scalability, security, and maintainability.
    - Documentation
      - If new files or modules are introduced, update the SDD with the new content while preserving the existing documentation.
      - For file updates, attach the FRD describing the changes made.
    - Final Deliverable
      - Provide the full updated or new code file in a proper code block.
      - Ensure it is self-contained and ready for production integration.
`;

/**
 * Tool definition part
 * addnewFilePathToFolderStructure
 * inputs a string folderstructure and parses it to JSON.
 * Parse the Json and add a new file as per specification
 * Return it back to a JSON String
 */
const addnewFilePathToFolderStructure = (
  filestructure: string,
  filename: string,
): string => {
  const decodedFileStructure = JSON.parse(filestructure);
  decodedFileStructure[filename] = "";
  return JSON.stringify(decodedFileStructure);
};

const fileUpdationTool = tool({
  name: "addnewFilePathToFolderStructure",
  description:
    "Update the folderstructure and add an absolute path to the previous existing filestructure",
  parameters: z.object({
    filestructure: z.string(),
    filename: z.string(),
  }) as any,
  execute: [addnewFilePathToFolderStructure] as any,
});

const getProjectDetails = tool({
  name: "getProjectDetails",
  description:
    "Take the projectID and get all the details like SDD and SRS of the project inorder to get proper context",
  parameters: z.object({
    projecId: z.string(),
  }) as any,
  execute: projectControllers.getProjectById as any,
});

const filePopulationTool = tool({
  name: "writeCodeIntoFile",
  description:
    "Given the file name and set of some other information, update the code file",
  parameters: z.object({
    srs: z.string(),
    codefile: z.string(),
    gitSummary: z.string(),
    currentStatus: z.string(),
    sdd: z.string(),
  }) as any,
  execute: customAIFeaturesControllers.generateFileBasedOnSingleFile as any,
});
/**
 * So i need to create an agent that has the following tools
 * create an AI Agent which can implement the following task
 * Update the folderstructure and add an absolute path - addnewFilePathToFolderStructure
 * fetch project information - predefined in project controllers
 * populate code file - predefined function in customAIController
 */
const octobot = new Agent({
  name,
  instructions,
  tools: [fileUpdationTool, getProjectDetails, filePopulationTool],
});

export default octobot;
