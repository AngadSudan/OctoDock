import { Ollama } from "ollama";
import {
  CodeGenerationForCorrection,
  CodeGenerationForFeature,
  CodeGenerationForFile,
} from "../utils/prompt";
import OpenAI from "openai";
import openRouterKeys from "../utils/openRouter";
import logger from "../utils/Logger";
import { codeMap, PRE_EXISTING } from "../utils/sampleProject";

class customModel {
  ollama: Ollama;

  constructor() {
    this.ollama = new Ollama({
      host: process.env.OLLAMA_URL!,
    });
  }
  async generateFileBasedOnFeatures(
    srs: string,
    description: string,
    gitSummary: string
  ) {
    const prompt = CodeGenerationForFeature.replace(
      "{srs_documentdetails}",
      srs
    )
      .replace("{current_feature}", description)
      .replace("{git_summary}", gitSummary);
    const modelConfig = {
      model: "AngadSudan/octadock",
      prompt: prompt,
      Stream: false,
      format: "json",
    };
    const response = await this.ollama.generate(modelConfig);
    return response;
  }
  async generateFileBasedOnSingleFile(
    srs,
    codefile,
    gitSummary,
    currentStatus,
    sdd
  ) {
    if (PRE_EXISTING.includes(codefile)) return codeMap[codefile];

    let response = "";
    const prompt = CodeGenerationForFile.replace("{srs_documentdetails}", srs)
      .replace("{code_file}", codefile)
      .replace("{git_summary}", gitSummary)
      .replace("{updated_file_system}", currentStatus)
      .replace("{software_design_document}", sdd);

    const packageValue = {
      name: "backend",
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        start: "node src/index.js",
        dev: "nodemon src/index.js",
        test: 'echo "Error: no test specified" && exit 1',
      },
      keywords: [],
      author: "",
      license: "ISC",
      type: "commonjs",
      dependencies: {
        axios: "^1.11.0",
        bcrypt: "^6.0.0",
        bcryptjs: "^3.0.2",
        cors: "^2.8.5",
        dotenv: "^17.2.1",
        express: "^5.1.0",
        "express-validator": "^7.2.1",
        helmet: "^8.1.0",
        jsonwebtoken: "^9.0.2",
        mongoose: "^8.18.0",
        morgan: "^1.10.1",
      },
      devDependencies: {
        nodemon: "^3.1.10",
      },
    };

    if (codefile === "package.json") {
      return codeMap["index.js"];
    }
    let retryCount = 0;
    const openai = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: openRouterKeys.getAvailableKey(),
    });

    let success = false;
    while (!success) {
      if (retryCount === 3) {
        break;
      }
      try {
        console.log({
          message: `creating file ${codefile} ...`,
        });
        const completion = await openai.chat.completions.create({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "system",
              content:
                "You are given a software design document. Based on the specification of the file given in it you will be creating the code for a backend application.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        response = completion.choices[0].message.content;
        success = true;
      } catch (error) {
        retryCount++;
        console.log({
          message:
            "Error occurred, rotating key and retrying: " + error.message,
          loggingLevel: "error",
          error: error,
        });
        openRouterKeys.rotateToNextKey();
      }
    }

    if (response === "") {
      // return something from the predefined project
      if (codefile.contains("routes")) {
        return codeMap["routes.js"];
      } else if (codefile === "index.js") {
        return codeMap["index.js"];
      } else {
        return codeMap[codefile] || "";
      }
    }

    return response;
  }
  async generateCorrectnessInFileOnBuggyFeature(
    srs: string,
    codefile: string,
    gitSummary: string
  ) {
    const prompt = CodeGenerationForCorrection.replace(
      "{srs_documentdetails}",
      srs
    )
      .replace("{current_code}", codefile)
      .replace("{git_summary}", gitSummary);
    const modelConfig = {
      model: "AngadSudan/octadock",
      prompt: prompt,
      Stream: false,
      format: "json",
    };
    const response = await this.ollama.generate(modelConfig);
    return response;
  }
}

export default new customModel();
