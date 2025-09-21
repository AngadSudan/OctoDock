import prisma from "@octodock/prisma";
import logger from "../utils/Logger";
class envController {
  /**
   * Add a new env to the project
   */
  async registerNewEnv(name: string, value: string, projectId: string) {
    try {
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) throw new Error("Db Project not found");

      const createNewEnv = await prisma.enviornmentVariables.create({
        data: { name, value, projectId: dbProject.id },
      });

      if (!createNewEnv) throw new Error("error in creating env");

      return createNewEnv;
    } catch (err) {
      logger.logData({
        message: err.message,
        loggingLevel: "error",
        error: err,
      });
    }
  }
  /**
   * update existing env of the project
   */
  async updateEnvVariables(envId: string, name: string, value: string) {
    try {
      const dbEnv = await prisma.enviornmentVariables.findUnique({
        where: {
          id: envId,
        },
      });

      if (!dbEnv) throw new Error("no env found with this id");

      const updatedEnv = await prisma.enviornmentVariables.update({
        where: {
          id: envId,
        },
        data: {
          name,
          value,
        },
      });

      if (!updatedEnv) throw new Error("error in updating env");

      return updatedEnv;
    } catch (error) {
      logger.logData({
        message: error.message,
        loggingLevel: "error",
        error: error,
      });
      return null;
    }
  }
  /**
   * delete
   */
  async deleteEnvVariables(envId: string) {}
  /**
   *
   * Take the projetId and then calculate the array of env.
   */
  async getAllEnvPerProject(projectId: string) {
    try {
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) throw new Error("no database entry found");

      const envs = await prisma.enviornmentVariables.findMany({
        where: {
          projectId: projectId,
        },
      });

      if (!envs) return [];

      return envs;
    } catch (error) {
      logger.logData({
        message: error.message,
        loggingLevel: "error",
        error: error,
      });
      return null;
    }
  }
}
export default new envController();
