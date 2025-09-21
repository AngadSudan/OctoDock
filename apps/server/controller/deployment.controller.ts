import prisma from "@octodock/prisma";

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
    projectId: string
  ) {}
  /**
   * When a project has been already deployed,
   */
  async redeployProject(
    dockerimage: string,
    urlSlug: string,
    projectId: string
  ) {}
  async getAllUserDeployment(projectId: string) {}
  async getDeploymentByProject(projectId: string) {
    const dbUser = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!dbUser) throw new Error("no such project found");

    const deployments = await prisma.deployment.findMany({
      where: {
        projectId: projectId,
      },
    });

    if (Array.isArray(deployments) && deployments.length === 0) {
      return [];
    }
    return deployments;
  }
}
export default new deploymentController();
