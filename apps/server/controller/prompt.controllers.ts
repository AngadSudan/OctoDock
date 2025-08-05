import prisma from "../utils/prisma";
import AiFeaturesControllers from "./AiFeatures.controllers";
class promptControllers {
  async createPrompt(userId: string, projectId: string, prompt: string) {
    const dbUser = await prisma.user.findFirst({
      where: {
        username: userId,
      },
    });

    if (!dbUser) return null;

    const dbProject = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!dbProject) throw new Error("no such registered Project");
    const generatedPrompt = await AiFeaturesControllers.enhanceFeedbackPrompt(
      "srs",
      prompt
    );
    const originalFolderStructure = JSON.parse(dbProject.folderStructure);

    // TODO: ADD THE AI FEATURES WHICH WILL RETURN THE NEW REPONSE

    let responseFolderStructure = {
      ...originalFolderStructure,
      "newFile.js": "string",
    };
    const updatedFolderStructure = JSON.stringify(responseFolderStructure);

    const answerText = await AiFeaturesControllers.getResponseText(
      originalFolderStructure,
      updatedFolderStructure,
      prompt
    );

    // const reportedAnswer =
    const createdPrompt = await prisma.prompt.create({
      data: {
        userPrompt: prompt,
        generatedPrompt: generatedPrompt,
        reportedAnswer: answerText,
        projectId,
        sucessResponse: "SUCCESS",
        folderStructure: updatedFolderStructure,
      },
    });
    console.log(createdPrompt);
    return createdPrompt;
  }
  async getAllPromptPerProject(projectId: string) {
    try {
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) throw new Error("projectID invalid");

      const dbPrompts = await prisma.prompt.findMany({
        where: {
          projectId: dbProject.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return dbPrompts;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async changeFileStructureBasedOnPrompt(promptId: string) {
    try {
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new promptControllers();
