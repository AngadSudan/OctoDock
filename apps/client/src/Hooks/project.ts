import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation createNewProject(
    $userId: String!
    $name: String!
    $description: String!
  ) {
    createNewProject(userId: $userId, name: $name, description: $description) {
      id
      name
      description
      generatedPrompt
      githubUrl
      folderStructure
      status
      user {
        name
      }
      createdBy
      prompts
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: String!, $userId: String!) {
    deleteProject(projectId: $projectId, userId: $userId) {
      userId
      name
      description
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $name: String!
    $projectId: String!
    $userId: String!
    $description: String!
  ) {
    updateProject(
      name: $name
      projectId: $projectId
      userId: $userId
      description: $description
    ) {
      userId
      name
      description
    }
  }
`;

export const GET_ALL_PROJECT = gql`
  query getAllUserProject($id: ID!) {
    getAllUserProject(id: $id) {
      id
      name
      description
      generatedPrompt
      githubUrl
      folderStructure
      status
      createdBy
      user {
        name
        username
        email
      }
      prompts
      createdAt
      updatedAt
    }
  }
`;

export const GET_INDIVIDUAL_PROJECT = gql`
  query getProjectById($id: ID!) {
    getProjectById(id: $id) {
      id
      name
      description
      generatedPrompt
      githubUrl
      folderStructure
      status
      createdBy
      isInitialized
      user {
        name
        username
        email
      }
      prompts
      createdAt
      updatedAt
    }
  }
`;
