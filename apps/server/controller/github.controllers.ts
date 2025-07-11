import prisma from "../utils/prisma";
import { Octokit } from "octokit";
class githubController {
  token: string;
  octokit: Octokit;
  constructor(token: string) {
    this.token = token;
    this.octokit = new Octokit({
      // auth: process.env.GITHUBTOKEN!,
      auth: token,
    });
  }
  async createRepository(name: string, description: string): Promise<any> {
    try {
      const newRepo = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
        headers: {
          authorization: `Authorization: Bearer ${this.token}`,
        },
      });
      console.log("repo has been created", JSON.stringify(newRepo, null, 2));
      const repoInformation = {
        url: newRepo.url,
        name: newRepo.data.name,
        userInfo: newRepo.data.owner,
      };
      return repoInformation;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
  async archiveRepository(owner: string, url: string) {
    try {
      const projectData = await this.octokit.rest.repos.update({
        owner,
        repo: url,
        archived: true,
      });

      if (!projectData) throw new Error("project couldn't be initialized");
      return "";
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateRepository(
    owner: string,
    url: string,
    name: string,
    description
  ) {
    try {
      const projectData = await this.octokit.rest.repos.update({
        owner,
        repo: url,
        name,
        description,
      });

      if (!projectData) throw new Error("project couldn't be initialized");
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  //NOTE: EITHER USE STACKBLITZ TO PUSH TO GITHUB OR TRY TO IMPLEMENT THIS LATER ON NOT NOW
  async commitCodeToGithub({
    projectId,
    message,
  }: {
    projectId: string;
    message: string;
  }): Promise<any> {
    try {
    } catch (error: any) {
      console.log(error);
    }
  }
}
export default githubController;
