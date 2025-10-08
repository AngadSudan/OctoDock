import logger from "../utils/Logger";
import prisma from "../utils/prisma";
import { Octokit } from "octokit";
class githubController {
  token: string;
  octokit: Octokit;
  constructor(token: string) {
    this.token = token;
    this.octokit = new Octokit({
      auth: token,
    });
  }

  async createRepository(name: string, description: string): Promise<any> {
    try {
      const newRepo = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
        auto_init: true,
      });
      const repoInformation = {
        url: newRepo.data.url,
        name: newRepo.data.name,
        userInfo: newRepo.data.owner,
      };
      console.log({
        message:
          "Repository Created with the following information" +
          JSON.stringify(repoInformation),
      });
      return repoInformation;
    } catch (error: any) {
      console.log({
        message: "Error: " + error.message,
        loggingLevel: "error",
        error: error,
      });
      return null;
    }
  }
  async archiveRepository(owner: string, repo: string) {
    try {
      const projectData = await this.octokit.rest.repos.update({
        owner,
        repo,
        archived: true,
      });

      if (!projectData || !projectData.data.archived)
        throw new Error("Project couldn't be archived");

      return "OK";
    } catch (error) {
      console.log({
        message: "Error in archiving repo: " + error.message,
        loggingLevel: "error",
        error: error,
      });
      return null;
    }
  }

  async updateRepository(
    owner: string,
    url: string,
    name: string,
    description,
  ) {
    try {
      const projectData = await this.octokit.rest.repos.update({
        owner,
        repo: url,
        name,
        description,
      });
      if (!projectData) throw new Error("project couldn't be initialized");
      return "OK";
    } catch (error) {
      console.log({
        message: "Error: " + error.message,
        loggingLevel: "error",
        error: error,
      });
      return null;
    }
  }
  async commitCodeToGithub(projectId: string, folder: any[]): Promise<any> {
    try {
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) {
        return null;
      }

      let projectURL = dbProject.githubUrl;
      projectURL = projectURL.replace("https://api.github.com/repos/", "");
      projectURL = projectURL.replace(".git", "");
      const repoData = projectURL.split("/");
      const userName = repoData[0];
      const repoName = repoData[1];
      const createdCommit = await this.createCommit(userName, repoName, folder);

      if (!createdCommit) throw new Error("commit couln't be updated");

      await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          folderStructure: JSON.stringify(folder),
        },
      });
      return "OK";
    } catch (error: any) {
      console.log({
        message: "Error: " + error.message,
        loggingLevel: "error",
        error: error,
      });
    }
  }

  async createBlobs(owner: string, repo: string, folder: any[]): Promise<any> {
    const blobPromises = Object.keys(folder).map(async (file) => {
      const createdBlob = await this.octokit.rest.git.createBlob({
        owner,
        repo,
        content: folder[file],
        encoding: "utf-8",
      });
      console.log({
        message:
          "Blob created for:" + file + "with SHA:" + createdBlob.data.sha,
      });

      return {
        path: file,
        mode: "100644",
        type: "blob",
        sha: createdBlob.data.sha,
      };
    });

    return await Promise.all(blobPromises);
  }

  async createTree(
    owner: string,
    repo: string,
    treeEntries: any[],
  ): Promise<any> {
    const response = await this.octokit.rest.git.createTree({
      owner: owner,
      repo: repo,
      tree: treeEntries,
    });
    return response.data.sha;
  }
  async createCommit(owner: string, repo: string, folder: any[]) {
    const blobEntries = await this.createBlobs(owner, repo, folder);

    const treeSha = await this.createTree(owner, repo, blobEntries);

    const { data: refData } = await this.octokit.rest.git.getRef({
      owner: owner,
      repo: repo,
      ref: "heads/main",
    });
    const latestCommitSha = refData.object.sha;
    console.log({
      message: "✅ Latest commit on main:" + latestCommitSha,
    });

    const { data: newCommit } = await this.octokit.rest.git.createCommit({
      owner: owner,
      repo: repo,
      message: "Octodock commit for your project success",
      tree: treeSha,
      parents: [latestCommitSha],
    });
    await this.octokit.rest.git.updateRef({
      owner,
      repo,
      ref: "heads/main", // branch to update
      sha: newCommit.sha, // new commit SHA
      force: true, // overwrite if needed
    });
    return newCommit.sha;
  }
}
export default githubController;
