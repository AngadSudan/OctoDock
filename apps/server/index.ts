import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import createApolloServer from "./graphql/index";
import "dotenv/config";
import passport from "passport";
import "./utils/passport";
import bodyParser from "body-parser";
import session from "express-session";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { Express } from "express";
import proxy from "express-http-proxy";
import url from "url";
import projectControllers from "./controller/project.controllers";
import githubController from "./controller/github.controllers";
import prisma from "./utils/prisma";
const app: Express = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 200,
  message: "Too many requests from this IP, please try again after 10 minutes",
});

//websecurity
app.use(helmet());
app.use("/api", limiter);
app.use(hpp() as any);
app.use(
  require("express-session")({
    secret: "TTL",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true if using HTTPS
      sameSite: "lax", // "none" if cross-origin over HTTPS
    },
  })
);
app.use(passport.initialize() as any);
app.use(passport.session());

//express middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:4000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remeber-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  })
);
const apiProxy = proxy("http://localhost:4000", {
  proxyReqPathResolver: (req) => url.parse(req.baseUrl).path,
});
app.use("/graphql", apiProxy);

//error handling

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Backend of the dr. web application API ",
    version: "1.0.0",
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    FRONTEND_URL: process.env.FRONTEND_URL,
  });
});
app.get("/health", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy!",
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    FRONTEND_URL: process.env.FRONTEND_URL,
  });
});

// OAuth Routes
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user", "repo"] })
);
app.get("/is-authenticated", (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get(
  "/oauth/redirect/github",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/auth/error",
    successRedirect: "http://localhost:5173",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

// SSE ROUTING
app.get("/initialize-project", projectControllers.initializeProject);
app.post("/push/:id", async (req, res) => {
  const username = req.body.username;
  const foldername = req.body.foldername;
  const projectId = req.params.id;
  console.log(username);
  console.log(foldername);
  console.log(projectId);
  const dbUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!dbUser) throw new Error("not a registered user");
  const response = await new githubController(
    dbUser.githubToken
  ).commitCodeToGithub(projectId, foldername);

  console.log(response);

  return res.status(200).json({ message: "ok" });
});
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);

  // Handle specific error types
  if (error.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation Error",
      details: error.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID format",
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      status: "error",
      message: "Duplicate key error",
    });
  }

  // Default error response
  res.status(error.status || 500).json({
    status: "error",
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

createApolloServer()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server ready at http://localhost:8000/`);
    });

    server.setTimeout(0);
  })
  .catch((error: any) => {
    console.log(error);
    process.exit();
  });

// app.listen(process.env.PORT || 8000, () => {
//   console.log(
//     `Server is running on port ${8000} and the enviornment is ${process.env.NODE_ENV} mode`
//   );
// });
export { app as default };
