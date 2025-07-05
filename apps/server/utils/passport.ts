import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "./prisma";

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
      scope: ["user:email"],
    },
    async function (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      //TODO: just complete the user authentication with the controller
      const email = profile.emails?.[0]?.value;

      //CHECK FOR USER EXISTENCE IS YES THEN LOGIN ELSE SIGNUP
      const dbUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (dbUser) {
        // login()
      } else {
        // signup()
      }
      console.log("accessToken" + accessToken);
      
      return done(null, profile);
    }
  )
);
