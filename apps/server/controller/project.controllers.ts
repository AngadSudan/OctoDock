import prisma from "../utils/prisma";
import AiFeaturesControllers from "./AiFeatures.controllers";
import aiGenerations from "./AiFeatures.controllers";
import githubController from "./github.controllers";
import gptFeaturesControllers from "./gptFeatures.controllers";
class projectController {
  async createNewProject(userId: string, name: string, description: string) {
    try {
      /**
       * create a project on the basis of the name and description.
       * Create repo using the user AuthToken
       * create an enhancedPrompt about the project description to give to further AI Agents
       */

      console.log(userId);
      const dbUser = await prisma.user.findFirst({
        where: {
          username: userId,
        },
      });
      console.log(dbUser);
      if (!dbUser) throw new Error("no user token found. Kindly login/Signup");

      const githubToken =
        dbUser.githubToken || "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";

      const createRepository = await new githubController(
        githubToken
      ).createRepository(name, description);

      if (!createRepository) throw new Error("Error in creating repository");

      const generatedPrompt =
        await aiGenerations.enhanceUserGivenDescription(description);

      if (!generatedPrompt) throw new Error("Couln't generate SRS");

      // const generatedFileStructure =
      //   await gptFeaturesControllers.generateProjectFolderStructure(
      //     generatedPrompt
      //   );

      const generatedFileStructure =
        await AiFeaturesControllers.generateProjectFileStructure(
          generatedPrompt
        );

      if (!generatedFileStructure)
        throw new Error("error in creating folder structure for your project");

      let createdFileStrucutre = JSON.parse(generatedFileStructure);
      // const generatedFolderStructure = await
      const createdProject = await prisma.project.create({
        data: {
          name,
          description,
          generatedPrompt,
          githubUrl: createRepository.url,
          createdBy: dbUser.id,
          folderStructure: JSON.stringify(createdFileStrucutre),
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
      const dbUser = await prisma.user.findFirst({
        where: {
          username: userId,
        },
      });

      if (!dbUser) throw new Error("Invalid userId");

      const userProjects = await prisma.project.findMany({
        where: {
          createdBy: dbUser.id,
          isActive: "ACTIVE",
        },
      });

      console.log(userProjects);
      if (!userProjects) return { message: "no projects found", data: [] };

      return userProjects;
    } catch (error: any) {
      console.log(error);
    }
  }

  async getProjectById(projecId: string) {
    try {
      console.log(projecId);
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projecId,
        },
        include: {
          user: true,
        },
      });
      console.log(dbProject);

      if (!dbProject) throw new Error("invalid projectId");
      return dbProject;
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
      const githubToken = "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";
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
      const githubToken = "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";
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
export default new projectController();
