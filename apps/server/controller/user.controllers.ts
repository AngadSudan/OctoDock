import prisma from "../utils/prisma";
import ApiResponse from "../utils/apiResposne";
import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
class userController {
  // create a user
  async registerUser() {
    await asyncHandler(async () => {});
  }

  // login the user
  async loginUser() {
    await asyncHandler(async () => {});
  }

  // login via OAuth Using githubOnly
  async OAuthLogin() {
    await asyncHandler(async () => {});
  }

  async getUserProfile() {
    await asyncHandler(async () => {});
  }

  async verifyUser() {
    await asyncHandler(async () => {});
  }
}
export default new userController();
