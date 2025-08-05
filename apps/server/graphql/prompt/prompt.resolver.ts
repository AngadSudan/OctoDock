import promptControllers from "../../controller/prompt.controllers";

const queries = {
  getAllPromptPerProject: async (_, { projectID }: { projectID: string }) => {
    return await promptControllers.getAllPromptPerProject(projectID);
  },
};
const mutations = {
  createPrompt: async (
    _,
    {
      userId,
      projectId,
      prompt,
    }: { userId: string; projectId: string; prompt: string }
  ) => {
    return await promptControllers.createPrompt(userId, projectId, prompt);
  },
};

const promptResolver = {
  queries,
  mutations,
};

export { promptResolver };
