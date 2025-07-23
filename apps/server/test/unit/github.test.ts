import { describe, expect, it } from "bun:test";
import githubController from "../../controller/github.controllers";
import { z } from "zod";
import { TestMap } from "../tools/testMap";
const git = new githubController(TestMap.github.token);
const repoPrefix = TestMap.github.repoName;
const gitCreateResponse = z.object({
  url: z.string(),
  name: z.string(),
  userInfo: z.object(),
});

describe("github controllers test suite", () => {
  it("repo creation test", async () => {
    const name = repoPrefix + Date.now();
    TestMap.github.repoName = name;
    const data = await git.createRepository(name, TestMap.github.description);
    TestMap.github.owner = data.userInfo.login;
    expect(() => gitCreateResponse.parse(data)).not.toThrow();
  });

  it(
    "updating the project description",
    async () => {
      setTimeout(() => {}, 3000);
      const data = await git.updateRepository(
        TestMap.github.owner,
        TestMap.github.repoName,
        TestMap.github.repoName + "_2",
        TestMap.github.description + " v2"
      );
      expect(data).toBe("OK");
    },
    { timeout: 10000 }
  );

  it(
    "create project commit",
    async () => {
      const data = await git.createCommit(
        TestMap.github.owner,
        TestMap.github.repoName
      );

      expect(() => z.string().parse(data)).not.toThrow();
    },
    { timeout: 1000000 }
  );

  it("archiving the test repository", async () => {
    console.log(
      TestMap.github.owner,
      TestMap.github.url,
      TestMap.github.repoName
    );
    const data = await git.archiveRepository(
      TestMap.github.owner,
      TestMap.github.repoName
    );

    expect(data).toBe("OK");
  });
});
