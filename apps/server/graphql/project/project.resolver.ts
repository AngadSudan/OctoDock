import projectController from "../../controller/project.controllers";
const queries = {
  getAllUserProject: async (_, { id }: { id: string }) => {
    return await projectController.getAllUserProject(id);
  },
  getProjectById: async (_, { id }: { id: string }) => {
    console.log("id is : ", id);
    return await projectController.getProjectById(id);
  },
};
const mutations = {
  createNewProject: async (
    _,
    {
      userId,
      name,
      description,
    }: { userId: string; name: string; description: string }
  ) => {
    return await projectController.createNewProject(userId, name, description);
  },
  deleteProject: async (
    _,
    { projectId, userId }: { projectId: string; userId: string }
  ) => {
    return await projectController.deleteProject(projectId, userId);
  },
  updateProject: async (
    _,
    {
      name,
      projectId,
      userId,
      description,
    }: { name: string; projectId: string; userId: string; description: string }
  ) => {
    return await projectController.updateProject(
      name,
      projectId,
      userId,
      description
    );
  },
};

export const projectResolver = {
  queries,
  mutations,
};
