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
    gitSummary: string,
  ) {
    const prompt = CodeGenerationForFeature.replace(
      "{srs_documentdetails}",
      srs,
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
    sdd,
  ) {
    if (PRE_EXISTING.includes(codefile)) {
      console.log("giving cached response", codefile);
      return codeMap[codefile];
    }

    let response = "";
    const prompt = CodeGenerationForFile.replace("{srs_documentdetails}", srs)
      .replace("{code_file}", codefile)
      .replace("{git_summary}", gitSummary)
      .replace("{updated_file_system}", currentStatus)
      .replace("{software_design_document}", sdd);

    if (codefile === "package.json") {
      return codeMap[codefile];
    }

    let retryCount = 0;
    console.log("generating ressponse from AI", codefile);
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
      } else if (codefile === "src/index.js") {
        return codeMap["src/index.js"];
      } else if (codefile.contains("models")) {
        return codeMap["models.js"];
      } else {
        return codeMap[codefile] || "";
      }
    }

    return response;
  }
  async generateCorrectnessInFileOnBuggyFeature(
    srs: string,
    codefile: string,
    gitSummary: string,
  ) {
    const prompt = CodeGenerationForCorrection.replace(
      "{srs_documentdetails}",
      srs,
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
