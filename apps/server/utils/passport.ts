import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "./prisma";
import githubControllers from "../controller/github.controllers";
import { isNamedType } from "graphql";
import userControllers from "../controller/user.controllers";
import logger from "./Logger";
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_OAUTH_CLIENTID!,
      clientSecret: process.env.GITHUB_OAUTH_SECRET!,
      callbackURL:
        process.env.GITHUB_CALLBACK_URL! ||
        "http://localhost:8000/oauth/redirect/github",
      passReqToCallback: true,
      scope: ["user", "repo"],
    },
    async function (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      //TODO: just complete the user authentication with the controller
      const username = profile.username || profile._json.login;
      const email = profile.emails?.[0]?.value;
      let name = profile._json.name;

      const dbUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (dbUser) {
        const userLogin = await userControllers.OAuthLogin(email, accessToken);
        if (userLogin) {
          console.log({
            message: "",
          });
          console.log("user loggedin ");
        }
      } else {
        if (!name) {
          name = username;
        }
        await userControllers.OAuthRegister(username, email, accessToken, name);
        console.log("user created");
      }

      return done(null, profile);
    }
  )
);
