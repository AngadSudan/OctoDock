import { expect, it, describe } from "bun:test";
import gptFeaturesControllers from "../../controller/gptFeatures.controllers";
import { TestMap } from "../tools/testMap";
import z from "zod";
describe("chatgpt test suites", () => {
  it(
    "generating project file structure",
    async () => {
      const data = await gptFeaturesControllers.generateProjectFolderStructure(
        TestMap.gemini.enhancedPrompt
      );
      console.log(data);
      TestMap.chatgpt.fileStructure = data as any;
      expect(() => z.array(z.string()).parse(data)).not.toThrow();
    },
    { timeout: 100000 }
  );
});
