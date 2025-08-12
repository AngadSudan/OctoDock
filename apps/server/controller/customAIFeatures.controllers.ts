import { Ollama } from "ollama";
import {
  CodeGenerationForCorrection,
  CodeGenerationForFeature,
  CodeGenerationForFile,
} from "../utils/prompt";

class customModel {
  ollama: Ollama;

  constructor() {
    this.ollama = new Ollama();
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
    currentStatus: string
  ) {
     console.log(`creating file ${codefile} ...`)
    const prompt = CodeGenerationForFile.replace("{srs_documentdetails}", srs)
      .replace("{code_file}", codefile)
      .replace("{git_summary}", gitSummary)
      .replace("{updated_file_system}", currentStatus);
    const modelConfig = {
      model: "AngadSudan/octadock",
      prompt: prompt,
      Stream: false,
      format: "json",
    };
    const response = await this.ollama.generate(modelConfig);
    console.log("OLLAMA CONFIG:", response);
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
