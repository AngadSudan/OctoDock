import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "./prisma";
import githubControllers from "../controller/github.controllers";
import { isNamedType } from "graphql";
import userControllers from "../controller/user.controllers";
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
      callbackURL: "http://localhost:8000/oauth/redirect/github",
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

      // console.log(JSON.stringify(profile, null, 2));
      console.log(profile);
      console.log(profile.username);
      const username = profile.username || profile._json.login;
      const email = profile.emails?.[0]?.value;
      const name = profile._json.name;

      const dbUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log("db user is ", dbUser);
      if (dbUser) {
        const userLogin = await userControllers.OAuthLogin(email, accessToken);
        if (userLogin) {
          console.log("user loggedin ");
        }
      } else {
        await userControllers.OAuthRegister(username, email, accessToken, name);
        console.log("user created");
      }

      return done(null, profile);
    }
  )
);
