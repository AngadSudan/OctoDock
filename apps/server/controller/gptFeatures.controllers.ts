import OpenAI from "openai";
import { generateFileStructurePrompt } from "../utils/prompt";
class gptFeatures {
  client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY!,
    });
  }

  async generateProjectFolderStructure(description: string) {
    // Fill in the prompt template
    const prompt = generateFileStructurePrompt.replace(
      "{detailed_project_planning}",
      description
    );

    // Call the LLM with the *actual* prompt
    const response = await this.client.responses.parse({
      model: "gpt-4o-2024-08-06",
      input: [
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
      text: {
        format: { type: "json_object" },
      },
    });

    // Return the parsed output
    return response.output_parsed;
  }
}

export default new gptFeatures();
