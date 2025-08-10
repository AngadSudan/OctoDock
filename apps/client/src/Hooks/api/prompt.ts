import { useQuery, useMutation } from "@apollo/client";
import { CREATE_PROMPT, GET_ALL_PROMPT } from "../prompt";

export const useGetAllPrompt = (projectID) => {
  const { data, loading, error } = useQuery(GET_ALL_PROMPT, {
    variables: { projectID: projectID },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !projectID,
  });
  return { data, loading, error };
};
export const useCreatePrompt = () => {
  const [createPromptMutation, { data, loading, error }] =
    useMutation(CREATE_PROMPT);

  const createPrompt = async (userId, projectId, prompt) => {
    try {
      const response = await createPromptMutation({
        variables: {
          userId,
          projectId,
          prompt,
        },
      });
      return response.data?.createPrompt; // ✅ Corrected line
    } catch (err) {
      console.error("Create prompt error:", err);
      throw err;
    }
  };

  return { createPrompt, data, loading, error };
};
