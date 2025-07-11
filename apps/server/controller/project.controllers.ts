import prisma from "../utils/prisma";
import ApiResponse from "../utils/apiResposne";
import type { Request, Response } from "express";
import aiGenerations from "./AiFeatures.controllers";
import githubController from "./github.controllers";

class projectController {
  async createNewProject(userId: string, name: string, description: string) {
    try {
      /**
       * create a project on the basis of the name and description.
       * Create repo using the user AuthToken
       * create an enhancedPrompt about the project description to give to further AI Agents
       */

      const dbUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!dbUser) throw new Error("no user token found. Kindly login/Signup");

      const githubToken = dbUser.githubToken;

      const createRepository = await new githubController(
        githubToken
      ).createRepository(name, description);
      const generatedPrompt =
        await aiGenerations.enhanceUserGivenDescription(description);

      const createdProject = await prisma.project.create({
        data: {
          name,
          description,
          generatedPrompt,
          githubUrl: createRepository.url,
          createdBy: dbUser.id,
        },
      });

      return createdProject;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async getAllUserProject(userId: string) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!dbUser) throw new Error("Invalid userId");

      const userProjects = await prisma.project.findMany({
        where: {
          createdBy: userId,
          isActive: "ACTIVE",
        },
      });

      if (!userProjects) return { message: "no projects found", data: [] };

      return { message: "projects loaded!", data: userProjects };
    } catch (error: any) {
      console.log(error);
    }
  }

  async getProjectById(projecId: string) {
    try {
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projecId,
        },
      });

      if (!dbProject) throw new Error("invalid projectId");

      return { message: "project fetched!", data: dbProject };
    } catch (error: any) {
      console.log(error);
    }
  }

  async deleteProject(projectId: string, userId: string) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!dbUser) throw new Error("Kindly login/signup first");
      const githubToken = dbUser.githubToken;
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) throw new Error("Invalid ProjectID");
      if (dbProject.createdBy !== dbUser.id) {
        throw new Error("You are not authorized to delete the project");
      }
      // archive the repo link and set the visibility status to inactive
      const arhivedRepo = await new githubController(
        githubToken
      ).archiveRepository(dbUser.githubUsername, dbProject.githubUrl);

      if (!arhivedRepo) throw new Error("error deleting repository");

      const deleteProject = await prisma.project.delete({
        where: {
          id: dbProject.id,
        },
      });
      if (!deleteProject)
        throw new Error("error in deleting the project. Kindly retry later");
      return deleteProject;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }

  async updateProject(
    name: string,
    projectId: string,
    userId: string,
    description: string
  ) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!dbUser) throw new Error("Kindly login/signup first");
      const githubToken = dbUser.githubToken;
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) throw new Error("Invalid ProjectID");
      if (dbProject.createdBy !== dbUser.id) {
        throw new Error("You are not authorized to delete the project");
      }

      /**
       * if name is not same as project rename the repo name as well as description and update the url
       */

      let newGitHubUrl = "";

      // object that contains new repo name and other info which will be sent to db
      const updatedGithubInformation = await new githubController(
        githubToken
      ).updateRepository(
        dbUser.githubUsername,
        dbProject.githubUrl,
        name,
        description
      );
      if (!updatedGithubInformation)
        throw new Error("error in updating information");

      const updatedProjectInformaion = await prisma.project.update({
        where: {
          id: dbProject.id,
        },
        data: {
          name,
          description,
          githubUrl: newGitHubUrl,
        },
      });

      return updatedProjectInformaion;
    } catch (error: any) {
      console.log(error);
    }
  }
}
export default projectController;
