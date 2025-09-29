import keyManager from "../utils/keymanager";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Type } from "@google/genai";
import {
  compareChangesAndReturnText,
  enhanceUserGivenProjectDescription,
  generateFileStructurePrompt,
  generateSDDDocument,
} from "../utils/prompt";

class GeminiAiFeatures {
  availableKey: string;
  genAi: GoogleGenerativeAI;
  model: GenerativeModel;
  jsonModel: GoogleGenAI;
  constructor() {
    this.availableKey = keyManager.getAvailableKey();
    this.genAi = new GoogleGenerativeAI(this.availableKey);
    this.model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    this.jsonModel = new GoogleGenAI({ apiKey: this.availableKey });
  }

  async enhanceUserGivenDescription(userDescription: string) {
    if (!userDescription) return null;
    const prompt = enhanceUserGivenProjectDescription.replace(
      "{user_description}",
      userDescription
    );
    const response = await this.model.generateContent(prompt);
    return response.response.candidates[0].content.parts[0].text;
  }

  async generateProjectFileStructure(enhancedPrompt: string) {
    const prompt = generateFileStructurePrompt.replace(
      "{detailed_project_planning}",
      enhancedPrompt
    );

    const response = await this.jsonModel.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              path: { type: Type.STRING },
              content: { type: Type.STRING },
            },
            required: ["path", "content"],
          },
        },
      },
    });

    return response.text;
  }

  async getResponseText(
    originalFolderStructure: string,
    generatedFolderStructure: string,
    userPrompt: string
  ) {
    const prompt = compareChangesAndReturnText
      .replace("{original_folder_structure}", originalFolderStructure)
      .replace("corrected_folder_structure", generatedFolderStructure)
      .replace("user_prompt", userPrompt);
    const response = await this.model.generateContent(prompt);
    return response.response.candidates[0].content.parts[0].text;
  }
  async enhanceFeedbackPrompt(
    enahcedProjectDescription: string,
    userDescription: string
  ) {
    return "a";
  }
  async generateSDD(srsDocument: string, folderStructure: string) {
    if (!srsDocument || !folderStructure) return null;
    const prompt = generateSDDDocument
      .replace("{srs_document}", srsDocument)
      .replace("{folder}", folderStructure);
    const response = await this.model.generateContent(prompt);
    return response.response.candidates[0].content.parts[0].text;
  }
}

export default new GeminiAiFeatures();
