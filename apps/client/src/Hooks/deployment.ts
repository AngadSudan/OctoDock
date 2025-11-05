import { gql } from "@apollo/client";

export const GET_ALL_DEPLOYMENT = gql`
  query getAllUserDeployments($id: ID!) {
    getAllUserDeployment(id: $id) {
      id
      dockerImage
      urlSlug
      user {
        name
        username
        email
      }
      project {
        name
        description
        githubUrl
      }
      createdAt
      updatedAt
    }
  }
`;
