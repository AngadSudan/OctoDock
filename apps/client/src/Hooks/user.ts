import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query getUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      name
      username
      email
      profileImage
      bannerImage
      isValid
      project {
        id
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;
