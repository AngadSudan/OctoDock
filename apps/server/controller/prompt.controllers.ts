import prisma from "../utils/prisma";
import AiFeaturesControllers from "./AiFeatures.controllers";
class promptControllers {
  async createPrompt(userId: string, projectId: string, prompt: string) {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!dbUser) return null;

    const generatedPrompt = await AiFeaturesControllers.enhanceFeedbackPrompt(
      "srs",
      prompt
    );
    const createdPrompt = await prisma.prompt.create({
      data: {
        userPrompt: prompt,
        generatedPrompt: generatedPrompt,
        projectId,
      },
    });

    this.changeFileStructureBasedOnPrompt(createdPrompt.id);
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
          id: dbProject.id,
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
