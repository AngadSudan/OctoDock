import gemini from "./AiFeatures.controllers";
import ollama from "./customAIFeatures.controllers";
import gpt from "./gptFeatures.controllers";

class CodeAIController {
  // ================== Gemini AI ==================

  
  // Enhances a user-given project description using Gemini.
  
  async enhanceDescriptionWithGemini(userDescription: string) {
    if (!userDescription) throw new Error("Description cannot be empty");
    return await gemini.enhanceUserGivenDescription(userDescription);
  }

  
  // Generates a project file structure using enhanced Gemini prompt.
  
  async generateFileStructureWithGemini(enhancedDescription: string) {
    if (!enhancedDescription) throw new Error("Enhanced description is required");
    return await gemini.generateProjectFileStructure(enhancedDescription);
  }

  
  // (Placeholder) Enhances feedback prompt using Gemini - extend logic later.
  
  async generateFeedbackPromptWithGemini(enhanced: string, original: string) {
    return await gemini.enhanceFeedbackPrompt(enhanced, original);
  }

  // ================== GPT Features ==================

  
  // Generates folder structure JSON using OpenAI GPT-4o.
  
  async generateFileStructureWithGPT(description: string) {
    if (!description) throw new Error("Description is required for GPT structure generation");
    return await gpt.generateProjectFolderStructure(description);
  }

  // ================== Ollama Custom Model ==================

  
  // Generates new code file based on a feature using Ollama (Octadock).
  
  async generateFeatureFileWithOllama(srs: string, feature: string, gitSummary: string) {
    return await ollama.generateFileBasedOnFeatures(srs, feature, gitSummary);
  }

  
  // Generates an updated version of an existing file based on context.
  
  async generateFileWithOllama(srs: string, fileContent: string, gitSummary: string) {
    return await ollama.generateFileBasedOnSingleFile(srs, fileContent, gitSummary);
  }

  
  // Corrects buggy code in a file using Ollama's LLM logic.
  
  async correctBuggyFileWithOllama(srs: string, buggyFile: string, gitSummary: string) {
    return await ollama.generateCorrectnessInFileOnBuggyFeature(srs, buggyFile, gitSummary);
  }
}

export default new CodeAIController();
