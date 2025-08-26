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
    srs: string,
    codefile: string,
    gitSummary: string,
    currentStatus: string,
    sdd: string
  ) {
    let retry = false;
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
    try {
      console.log(`creating file ${codefile} ...`);
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: ` you are given a software design document. based on the specification of the file given in it you will be creating the code for an backend application.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      response = completion.choices[0].message.content;
    } catch (error) {
      retry = true;
      openRouterKeys.rotateToNextKey();
    }
    while (retry) {
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: ` you are given a software design document. based on the specification of the file given in it you will be creating the code for an backend application.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      response = completion.choices[0].message.content;
      retry = false;
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
