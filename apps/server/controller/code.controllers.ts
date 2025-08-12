import gemini from "./AiFeatures.controllers";
import gpt from "./gptFeatures.controllers";
import ollama from "./customAIFeatures.controllers";

class codeAIController {
  // Enhances a user description & generates project file structure

  async createProjectFileStructure(userDescription: string) {
    try {
      if (!userDescription) throw new Error("Project description is missing!");

      // Step 1: Enhance user input with Gemini
      const enhanced =
        await gemini.enhanceUserGivenDescription(userDescription);

      // Step 2: Generate file structure with Gemini
      const structure = await gemini.generateProjectFileStructure(enhanced);

      return structure;
    } catch (error: any) {
      console.error("createProjectFileStructure error:", error.message);
      throw error;
    }
  }

  // Generate multiple code files based on a list of features

  async writeCodeFiles(srs: string, features: string[], gitSummary: string) {
    try {
      if (!srs || !features?.length)
        throw new Error("Missing SRS or features list");

      const generatedFiles = [];

      for (const feature of features) {
        const file = await ollama.generateFileBasedOnFeatures(
          srs,
          feature,
          gitSummary
        );
        generatedFiles.push({ feature, file });
      }

      return generatedFiles;
    } catch (error: any) {
      console.error("writeCodeFiles error:", error.message);
      throw error;
    }
  }

  // Generate a single code file using current file + SRS context

  async writeCodeFile(
    srs: string,
    codefile: string,
    gitSummary: string,
    currentCodeFiles: string
  ) {
    try {
      if (!srs || !codefile) throw new Error("Missing SRS or file content");

      const response = await ollama.generateFileBasedOnSingleFile(
        srs,
        codefile,
        gitSummary,
        currentCodeFiles
      );
      const parsed = JSON.parse(response.response)
    console.log(parsed.content); 
      return parsed.content;
    } catch (error: any) {
      console.error("writeCodeFile error:", error.message);
      return null;
    }
  }

  async updateCodeInFile(srs: string, buggyCode: string, gitSummary: string) {
    try {
      if (!srs || !buggyCode) throw new Error("Missing SRS or buggy code");

      const response = await ollama.generateCorrectnessInFileOnBuggyFeature(
        srs,
        buggyCode,
        gitSummary
      );

      return response;
    } catch (error: any) {
      console.error("updateCodeInFile error:", error.message);
      throw error;
    }
  }
}

export default new codeAIController();
