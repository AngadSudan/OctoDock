import prisma from "@octodock/prisma";
import projectControllers from "./project.controllers";

class deploymentController {
  /**
   * Take the deployment details and then push those details to the db
   * and implement the next service worker.
   */

  async createDeployment(projectId: string) {}
  /**
   * Update the present deployment Information of the project (YAGNI)
   */
  async updateDeployment(
    dockerimage: string,
    urlSlug: string,
    projectId: string,
  ) {}
  /**
   * When a project has been already deployed,
   */
  async redeployProject(
    dockerimage: string,
    urlSlug: string,
    projectId: string,
  ) {}
  async getAllUserDeployment(userId: string) {
    try {
      const dbProject = await projectControllers.getAllUserProject(userId);
      const deployments = [];
      // @ts-ignore
      for (let i = 0; i < dbProject.length; i++) {
        // @ts-ignore
        const projectId = dbProject[i].id;
        const deployment = await this.getDeploymentByProject(projectId);
        if (deployment) {
          deployments.push(deployment);
        }
      }

      return deployments;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getDeploymentByProject(projectId: string) {
    try {
      const dbProject = await prisma.project.findFirst({
        where: {
          id: projectId,
        },
      });
      if (!dbProject) throw new Error("db project not found");

      const deployment = await prisma.deployment.findMany({
        where: {
          projectId: dbProject.id,
        },
        include: {
          user: true,
          project: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
      if (!deployment) return null;
      return deployment[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export default new deploymentController();
