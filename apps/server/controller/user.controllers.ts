import prisma from "../utils/prisma";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
class userController {
  // create a user
  async registerUser(
    name: string,
    username: string,
    githubUsername: string,
    email: string,
    password: string
  ) {
    try {
      const dbUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { githubUsername }],
        },
      });

      if (dbUser) throw new Error("user already exists");

      const salt = process.env.PASSWORD_SALT!;
      const hashPassword = crypto
        .createHmac("sha256", salt)
        .update(password)
        .digest("hex");

        let createdUser:any= '';
      if(!name){
        createdUser = await prisma.user.create({
          data: {
            name: name || username,
            username,
            githubUsername,
            email,
          password: hashPassword,
        },
      });
    }else{
      createdUser = await prisma.user.create({
          data: {
            name: name || username,
            username,
            githubUsername,
            email,
          password: hashPassword,
        },
      });
    }
      if (!createdUser) throw new Error("no user created");
      return createdUser;
    } catch (error) {
      console.log(error);
    }
  }
  async generateToken(id: string): Promise<any> {
    const token = jwt.sign(id, process.env.JWT_SECRET!);

    return token;
  }

  async loginUser(email: string, password: string) {
    const dbUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!dbUser) throw new Error("no user via email found");

    const salt = process.env.PASSWORD_SALT!;
    const hashPassword = crypto
      .createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashPassword !== dbUser.password) {
      throw new Error("invalid password");
    }

    const generatedAccessToken = this.generateToken(dbUser.id);
    return {
      ...dbUser,
      password: "",
      accessToken: generatedAccessToken,
    };
  }

  async OAuthLogin(email: string, accessToken: string) {
    /**
     * implementing login functionality
     * accept the email and query the db
     * get the user and then update its accessToken & password
     */
    try {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!dbUser) throw new Error("no user via email found");

      const updatedLoggedInUser = await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          githubToken: accessToken,
        },
      });

      const generatedAccessToken = this.generateToken(dbUser.id);
      return {
        updatedLoggedInUser,
        accessToken: generatedAccessToken,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async OAuthRegister(
    username: string,
    email: string,
    accessToken: string,
    name: string
  ) {
    console.log(username, email, accessToken, name);
    try {
      const createdUser = await prisma.user.create({
        data: {
          username,
          email,
          githubUsername: username,
          githubToken: accessToken,
          name,
        },
      });

      if (!createdUser) throw new Error("could not register user");

      return createdUser;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserProfile() {}

  async verifyUser() {}
}
export default new userController();
