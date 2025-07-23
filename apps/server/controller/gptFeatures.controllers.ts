import OpenAI from "openai";
import { generateFileStructurePrompt } from "../utils/prompt";

class GptFeatures {
  client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY!,
    });
  }

  async generateProjectFolderStructure(description: string) {
    const prompt = generateFileStructurePrompt.replace(
      "{detailed_project_planning}",
      description
    );

    const completion = await this.client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that generates realistic production-ready backend project folder structures in JSON for StackBlitz/WebContainers integration. Follow the given format precisely.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const rawText = completion.choices[0].message.content ?? "";

    // If it's a stringified array of paths or objects, return parsed JSON
    try {
      const parsed = JSON.parse(
        rawText.replace("```json", "").replace("```", "")
      );
      return parsed;
    } catch {
      console.warn("Warning: Output is not valid JSON, returning raw string.");
      return rawText.replace("```json", "").replace("```", "");
    }
  }
}

export default new GptFeatures();
