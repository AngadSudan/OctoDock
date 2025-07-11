import keyManager from "../utils/keymanager";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { enhanceUserGivenProjectDescription } from "../utils/prompt";
class GeminiAiFeatures {
  availableKey: string;
  genAi: GoogleGenerativeAI;
  model: GenerativeModel;

  constructor() {
    this.availableKey = keyManager.getAvailableKey();
    this.genAi = new GoogleGenerativeAI(this.availableKey);
    this.model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
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
}

export default new GeminiAiFeatures();
