import deploymentController from "../../controller/deployment.controller";
const queries = {
  getAllUserDeployment: async (_, { id }: { id: string }) => {
    return await deploymentController.getAllUserDeployment(id);
  },
  getDeploymentByProject: async (_, { id }: { id: string }) => {
    return await deploymentController.getDeploymentByProject(id);
  },
};
const mutations = {
  createDeployment: async (
    _,
    {
      dockerimage,
      urlSlug,
      projectId,
    }: { dockerimage: string; urlSlug: string; projectId: string },
  ) => {
    return await deploymentController.createDeployment(
      dockerimage,
      urlSlug,
      projectId,
    );
  },
  deleteProject: async (
    _,
    {
      dockerimage,
      urlSlug,
      projectId,
    }: { dockerimage: string; urlSlug: string; projectId: string },
  ) => {
    return await deploymentController.redeployProject(
      dockerimage,
      urlSlug,
      projectId,
    );
  },
};

export const deploymentResolver = {
  queries,
  mutations,
};
