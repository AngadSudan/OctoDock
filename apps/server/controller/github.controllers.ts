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
        auto_init: true,
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
  //NOTE: Change the complete github tree by fetching from stackblitz
  async commitCodeToGithub({ projectId }: { projectId: string }): Promise<any> {
    try {
      const dbProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!dbProject) {
        console.log("project is not listed!");
        return null;
      }

      let projectURL = dbProject.githubUrl;
      projectURL = projectURL.replace("https://github.com", "");
      projectURL = projectURL.replace(".git", "");
      const repoData = projectURL.split("/");
      const userName = repoData[0];
      const repoName = repoData[1];

      const createdCommit = await this.createCommit(userName, repoName);

      if (!createdCommit) throw new Error("commit couln't be updated");
    } catch (error: any) {
      console.log(error);
    }
  }

  async getFolderandFileContentfromstackblitz(): Promise<any[]> {
    return [];
  }
  async createBlobs(owner: string, repo: string, folder: any[]): Promise<any> {
    const blobPromises = folder.map(async (file) => {
      const createdBlob = await this.octokit.rest.git.createBlob({
        owner,
        repo,
        content: file.content,
        encoding: "utf-8",
      });
      console.log(
        "Blob created for:",
        file.path,
        "with SHA:",
        createdBlob.data.sha
      );
      return {
        path: file.path,
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
    treeEntries: any[]
  ): Promise<any> {
    const response = await this.octokit.rest.git.createTree({
      owner: owner,
      repo: repo,
      tree: treeEntries,
    });
    console.log("Tree created:", response.data);
    return response.data.sha;
  }
  async createCommit(owner: string, repo: string) {
    const folder = await this.getFolderandFileContentfromstackblitz();

    const blobEntries = await this.createBlobs(owner, repo, folder);
    console.log("All blobs created successfully");

    const treeSha = await this.createTree(owner, repo, blobEntries);
    console.log("Tree created successfully with sha:", treeSha);

    const { data: refData } = await this.octokit.rest.git.getRef({
      owner: owner,
      repo: repo,
      ref: "heads/main",
    });
    const latestCommitSha = refData.object.sha;
    console.log("✅ Latest commit on main:", latestCommitSha);

    const response = await this.octokit.rest.git.createCommit({
      owner: owner,
      repo: repo,
      message: "Octodock commit for your project success",
      tree: treeSha,
      parents: [latestCommitSha],
    });

    console.log("Commit created:", response.data);
    return response.data.sha;
  }
}
export default githubController;
