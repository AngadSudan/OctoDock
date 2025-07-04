import prisma from "../utils/prisma";
import ApiResponse from "../utils/apiResposne";
import type { Request, Response } from "express";

class projectController {
  async createNewProject(req: Request, res: Response) {
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

  async getAllUserProject(req: Request, res: Response) {
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

  async getProjectById(req: Request, res: Response) {
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

  async deleteProject(req: Request, res: Response) {
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

  async updateProject(req: Request, res: Response) {
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
export default projectController;
