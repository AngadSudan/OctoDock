import prisma from "../utils/prisma";
import ApiResponse from "../utils/apiResposne";
import type { Request, Response } from "express";
class codeOperationController {
  // generate the folder structure for the project with some defaults added ourselves
  async createProjectFileStructure(req: Request, res: Response) {
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

  // generate the code for all the files one by one and add then to StackBlitz
  async writeCodeFiles(req: Request, res: Response) {
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

  // generate code for one file at a time
  async writeCodeFile(req: Request, res: Response) {
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

  // update the created code frm a github repo
  async updateCodeInFile(req: Request, res: Response) {
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

export default new codeOperationController();
