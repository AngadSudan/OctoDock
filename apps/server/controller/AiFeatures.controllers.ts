import keyManager from "../utils/keymanager";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Type } from "@google/genai";
import {
  enhanceUserGivenProjectDescription,
  generateFileStructurePrompt,
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
          type: Type.OBJECT,
          properties: {
            root: {
              type: Type.OBJECT,
              properties: {
                directory: {
                  type: Type.OBJECT,
                  additionalProperties: {
                    type: Type.OBJECT,
                    properties: {
                      file: {
                        type: Type.OBJECT,
                        properties: {
                          contents: {
                            type: Type.STRING,
                          },
                        },
                      },
                      directory: {
                        type: Type.OBJECT,
                        additionalProperties: {}, // recursive nesting allowed
                      },
                    },
                    propertyOrdering: ["file", "directory"],
                  },
                },
              },
              propertyOrdering: ["directory"],
            },
          },
        },
      },
    });

    return response.text;
  }
}

export default new GeminiAiFeatures();
