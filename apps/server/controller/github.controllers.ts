import prisma from "../utils/prisma";
import ApiResponse from "../utils/apiResposne";
import { Octokit } from "octokit";
import type { Request, Response } from "express";
class githubController {
  octokit = new Octokit({
    auth: Bun.env.GITHUBTOKEN!,
  });

  async createRepository(req: Request, res: Response): Promise<any> {
    try {
      const { name, description } = req.body;

      const createdRepository =
        await this.octokit.rest.repos.createForAuthenticatedUser({
          name,
          description:
            description || "Created via OctoDock your Backend automater",
          private: false, // or true
        });
    } catch (error: any) {
      console.log(error);
      return res
        .status(200)
        .json(
          new ApiResponse(500, error.message || "Internal Server error", null)
        );
    }
  }

  async commitCodeToGithub(req: Request, res: Response): Promise<any> {
    try {
    } catch (error: any) {
      console.log(error);
      return res
        .status(200)
        .json(
          new ApiResponse(500, error.message || "Internal Server error", null)
        );
    }
  }

  async deleteRepository(req: Request, res: Response): Promise<any> {
    try {
    } catch (error: any) {
      console.log(error);
      return res
        .status(200)
        .json(
          new ApiResponse(500, error.message || "Internal Server error", null)
        );
    }
  }
}
export default new githubController();
