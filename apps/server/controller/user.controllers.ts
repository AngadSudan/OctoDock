import prisma from "../utils/prisma";
import ApiResponse from "../utils/apiResposne";
import type { Request, Response } from "express";
class userController {
  // create a user
  async registerUser(req: Request, res: Response) {
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

  // login the user
  async loginUser(req: Request, res: Response) {
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

  // login via OAuth Using githubOnly
  async OAuthLogin(req: Request, res: Response) {
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

  async getUserProfile(req: Request, res: Response) {
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

  async verifyUser(req: Request, res: Response) {
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
export default new userController();
