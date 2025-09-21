import envController from "../../controller/env.controller";

const envQueries = {
  getAllEnvPerProject: async (_, { id }: { id: string }) => {
    return await envController.getAllEnvPerProject(id);
  },
};
const envMutations = {
  registerNewEnv: async (
    _,
    { name, value, id }: { name: string; value: string; id: String }
  ) => {
    return await envController.registerNewEnv(name, value, id);
  },
  updateEnvVariables: async (_, { id }: { id: string }) => {
    return await envController.updateEnvVariables(id);
  },
};
export const envResolver = {
  queries: envQueries,
  mutations: envMutations,
};
