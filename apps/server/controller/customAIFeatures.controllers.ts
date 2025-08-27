import { Ollama } from "ollama";
import {
  CodeGenerationForCorrection,
  CodeGenerationForFeature,
  CodeGenerationForFile,
} from "../utils/prompt";
import OpenAI from "openai";
import openRouterKeys from "../utils/openRouter";

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
    let response = "";
    const prompt = CodeGenerationForFile.replace("{srs_documentdetails}", srs)
      .replace("{code_file}", codefile)
      .replace("{git_summary}", gitSummary)
      .replace("{updated_file_system}", currentStatus)
      .replace("{software_design_document}", sdd);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: openRouterKeys.getAvailableKey(),
    });

    let success = false;

    while (!success) {
      try {
        console.log(`creating file ${codefile} ...`);
        const completion = await openai.chat.completions.create({
          model: "openai/gpt-oss-20b:free",
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
        console.error("Error occurred, rotating key and retrying...", error);
        openRouterKeys.rotateToNextKey();
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
