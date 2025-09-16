import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import createApolloServer from "./graphql/index";
import "dotenv/config";
import passport from "passport";
import "./utils/passport";
import type { Express } from "express";
import proxy from "express-http-proxy";
import url from "url";
import projectControllers from "./controller/project.controllers";
import githubController from "./controller/github.controllers";
import prisma from "./utils/prisma";
import logger from "./utils/Logger";
import morgan from "morgan";
import LoggingController from "./controller/Logging.controller";
const app: Express = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 200,
  message: "Too many requests from this IP, please try again after 10 minutes",
});
app.use(morgan("dev") as any);
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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remeber-token",
      "Origin",
      "Accept",
    ],
  })
);
const apiProxy = proxy("http://localhost:4000", {
  proxyReqPathResolver: (req) => url.parse(req.url).path,
  selfHandleResponse: true,
  onProxyRes: async (proxyRes, req, res) => {
    let body = Buffer.from([]);
    proxyRes.on("data", (chunk) => {
      body = Buffer.concat([body, chunk]);
    });
    proxyRes.on("end", () => {
      // Override CORS headers
      res.setHeader(
        "Access-Control-Allow-Origin",
        req.headers.origin || "http://localhost:5173"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");

      // Send response body
      res.status(proxyRes.statusCode).send(body.toString("utf8"));
    });
  },
});

app.use("/graphql", apiProxy);

//error handling

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Backend of the Octodock application API ",
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
app.get("/error/logs", (req, res) =>
  LoggingController.servePaginatedLogic(req, res)
);
app.get(
  "/oauth/redirect/github",
  passport.authenticate("github", {
    failureRedirect:
      process.env.FRONTEND_URL_FAIL || "http://localhost:5173/auth/error",
    successRedirect:
      process.env.FRONTEND_URL_SUCCESS || "http://localhost:5173",
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

  const dbUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!dbUser) throw new Error("not a registered user");
  const response = await new githubController(
    dbUser.githubToken
  ).commitCodeToGithub(projectId, foldername);

  return res.status(200).json({ message: "ok" });
});
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({
    error: error,
    message: "Error: " + error.message,
    loggingLevel: "error",
  });
  console.log({
    error: error,
    message: "Stack: " + error.message,
    loggingLevel: "error",
  });

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
      user: "SYSTEM",
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      status: "error",
      message: "Duplicate key error",
      user: "SYSTEM",
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
      console.log({
        message: "application started on port 8000",
        loggingLevel: "info",
        error: null,
      });
      console.log("application started on port 8000");
    });

    server.setTimeout(0);
  })
  .catch((error: any) => {
    console.log({
      message: error.message,
      loggingLevel: "error",
      error: "ERROR",
    });
    process.exit();
  });

export { app as default };
