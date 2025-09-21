class envController {
  /**
   * Add a new env to the project
   */
  async registerNewEnv(name: string, value: string, projectId: String) {}
  /**
   * update existing env of the project
   */
  async updateEnvVariables(envId: string) {}
  /**
   * delete
   */
  async deleteEnvVariables(envId: string) {}
  /**
   *
   * Take the projetId and then calculate the array of env.
   */
  async getAllEnvPerProject(projectId: string) {}
}
export default new envController();
