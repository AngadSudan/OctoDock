import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_ALL_PROJECT,
  UPDATE_PROJECT,
} from "@/Hooks/project";

export const useCreateProject = () => {
  const [createProjectMutation, { data, loading, error }] =
    useMutation(CREATE_PROJECT);

  const createProject = async (userId, name, description) => {
    try {
      const response = await createProjectMutation({
        variables: {
          userId,
          name,
          description,
        },
      });
      return response.data?.createNewProject;
    } catch (err) {
      console.error("Create project error:", err);
      throw err;
    }
  };

  return { createProject, data, loading, error };
};

export const useDeleteProject = () => {
  const [deleteProjectMutation, { data, loading, error }] =
    useMutation(DELETE_PROJECT);

  const deleteProject = async (projectId, userId) => {
    try {
      const response = await deleteProjectMutation({
        variables: {
          userId,
          projectId,
        },
      });
      return response.data?.deleteProject;
    } catch (err) {
      console.error("Create project error:", err);
      throw err;
    }
  };

  return { deleteProject, data, error, loading };
};

export const useUpdateProject = () => {
  const [updateProjectMutation, { data, loading, error }] =
    useMutation(UPDATE_PROJECT);

  const updateProject = async (name, projectId, userId, description) => {
    try {
      const response = await updateProjectMutation({
        variables: {
          userId,
          projectId,
          name,
          description,
        },
      });
      return response.data?.updateProject;
    } catch (err) {
      console.error("Create project error:", err);
      throw err;
    }
  };

  return { updateProject, data, loading, error };
};

export const useGetAllProjectData = (userId) => {
  const { data, loading, error } = useQuery(GET_ALL_PROJECT, {
    variables: { id: userId },
    fetchPolicy: "cache-and-network",
    skip: !userId,
  });

  return { data, loading, error };
};

export const usegetProjectInfo = (projectId) => {
  const { data, loading, error } = useQuery(GET_ALL_PROJECT, {
    variables: { id: projectId },
    fetchPolicy: "cache-and-network",
    skip: !projectId,
  });

  return { data, loading, error };
};
