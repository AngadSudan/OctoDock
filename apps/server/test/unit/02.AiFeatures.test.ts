import { describe, it, expect } from "bun:test";
import AiFeaturesControllers from "../../controller/AiFeatures.controllers";
import { TestMap } from "../tools/testMap";
import z from "zod";

describe("gemini features test suite ", () => {
  it(
    "generate enhanced user given descriptions",
    async () => {
      const data = await AiFeaturesControllers.enhanceUserGivenDescription(
        TestMap.gemini.userDescription
      );

      TestMap.gemini.enhancedPrompt = data;
      expect(() => z.string().parse(data)).not.toThrow();
    },
    { timeout: 100000 }
  );

  it(
    "generateProjectFileStructure",
    async () => {
      const data = await AiFeaturesControllers.generateProjectFileStructure(
        TestMap.gemini.enhancedPrompt
      );

      //   console.log(JSON.stringify(data, null, 2));
      TestMap.gemini.fileStructure = JSON.parse(data).map((f: any) => f.path);
      //   console.log(TestMap.gemini.fileStructure);
      expect(() =>
        z.array(z.string()).parse(TestMap.gemini.fileStructure)
      ).not.toThrow();
    },
    { timeout: 100000 }
  );
});
