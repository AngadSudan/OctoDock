class deploymentController {
  /**
   * Take the deployment details and then push those details to the db
   * and implement the next service worker.
   */
  async createDeployment(
    dockerimage: string,
    urlSlug: string,
    projectId: string
  ) {}
  /**
   * Update the present deployment Information of the project (YAGNI)
   */
  async updateDeployment() {}
  /**
   * When a project has been already deployed,
   */
  async redeployProject(
    dockerimage: string,
    urlSlug: string,
    projectId: string
  ) {}
  getAllUserDeployment(userId: string) {}
  getDeploymentByProject(projectId: string) {}
}
export default new deploymentController();
