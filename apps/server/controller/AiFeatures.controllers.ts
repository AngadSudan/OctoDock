import keyManager from "../utils/keymanager";
import { GoogleGenAI, Type } from "@google/genai";
import {
  compareChangesAndReturnText,
  enhanceUserGivenProjectDescription,
  generateFileStructurePrompt,
  generateSDDDocument,
} from "../utils/prompt";
import {parse} from 'yaml';

class GeminiAiFeatures {
  availableKey: string;
  model: GoogleGenAI;
  jsonModel: GoogleGenAI;
  modelVersion: string;
  constructor() {
    this.availableKey = keyManager.getAvailableKey();
    this.model = new GoogleGenAI({ apiKey: this.availableKey });
    this.jsonModel = new GoogleGenAI({ apiKey: this.availableKey });
    this.modelVersion = "gemini-2.0-flash";
  }

  async enhanceUserGivenDescription(userDescription: string) {
    if (!userDescription) return null;
    const prompt = enhanceUserGivenProjectDescription.replace(
      "{user_description}",
      userDescription
    );
    const response = await this.model.models.generateContent({
      model: this.modelVersion,
      contents: prompt,
    })
    return response.text;
  }

  async generateProjectFileStructure(enhancedPrompt: string) {
    const prompt = generateFileStructurePrompt.replace(
      "{detailed_project_planning}",
      enhancedPrompt
    );

    const response = await this.jsonModel.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    console.log(response.text);
    console.log("_______________________");
    const parsedText = response.text.replace('```yaml',"").replace("```","")
    // TODO: use a json to yaml converter inorder to get the repsonse is json and return the project_dir object value
    // inside of an array
    const parsedObject = parse(parsedText);
    console.log(parsedObject);
    console.log("_______________________");
    
    console.log(parsedObject.project_dir);
    
    return parsedObject.project_dir;
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
    const response =await this.model.models.generateContent({
      model: this.modelVersion,
      contents: prompt,
    });
    return response.text;
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
    const response = await this.model.models.generateContent({
      model: this.modelVersion,
      contents: prompt,
    });
    return response.text;
  }
}

export default new GeminiAiFeatures();
