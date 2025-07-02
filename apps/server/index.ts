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
import {
  codeRouter,
  githubRouter,
  projectRouter,
  userRouter,
} from "./route/index";
const app = express();
import "dotenv/config";
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 200,
  message: "Too many requests from this IP, please try again after 10 minutes",
});

//websecurity
app.use(helmet());
// app.use(mogoSanitize());
app.use("/api", limiter);
app.use(hpp());

//express middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
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

app.use(morgan("dev"));

//error handling

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
// app.use(errorHandler);

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

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

console.log("database  url is ", process.env.DATABASE_URL!);

app.listen(Bun.env.PORT, () => {
  console.log(
    `Server is running on port ${8000} and the enviornment is ${process.env.NODE_ENV} mode`
  );
});

export { app as default };
