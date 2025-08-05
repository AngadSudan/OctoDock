import { gql } from "@apollo/client";

export const CREATE_PROMPT = gql`
  mutation createPrompt(
    $userId: String!
    $projectId: String!
    $prompt: String!
  ) {
    createPrompt(userId: $userId, projectId: $projectId, prompt: $prompt) {
      id
      userPrompt
      generatedPrompt
      reportedAnswer
      folderStructure
      successResponse
      projectId
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_PROMPT = gql`
  query getAllPromptPerProject($projectID: ID!) {
    getAllPromptPerProject(projectID: $projectID) {
      id
      userPrompt
      generatedPrompt
      reportedAnswer
      folderStructure
      successResponse
      projectId
      createdAt
      updatedAt
    }
  }
`;
