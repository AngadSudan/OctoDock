import prisma from "../utils/prisma";
import ApiResponse from "../utils/apiResposne";
import { Octokit } from "octokit";
import type { Request, Response } from "express";
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
  async createRepository(req: Request, res: Response): Promise<any> {
    try {
      const { name, description } = req.body;

      const newRepo = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
        headers: {
          authorization: `Authorization: Bearer ${this.token}`,
        },
      });
      console.log("repo has been created", newRepo);
    } catch (error: any) {
      console.log(error);
      return res
        .status(200)
        .json(
          new ApiResponse(500, error.message || "Internal Server error", null)
        );
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
export default githubController;
