import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { describe, expect, it } from "bun:test";
import userControllers from "../../controller/user.controllers";

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

const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $username: String!
    $githubUsername: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      name: $name
      username: $username
      githubUsername: $githubUsername
      email: $email
      password: $password
    ) {
      id
      name
      email
      username
      githubUsername
    }
  }
`;
const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
      username
    }
  }
`;
const useRegisterUser = () => {
  const [registerUserMutation, { data, loading, error }] =
    useMutation(REGISTER_USER);

  const registerUser = async ({
    name,
    username,
    githubUsername,
    email,
    password,
  }) => {
    try {
      const response = await registerUserMutation({
        variables: { name, username, githubUsername, email, password },
      });
      return response.data?.registerUser;
    } catch (err) {
      console.error("Register user error:", err);
      throw err;
    }
  };

  return { registerUser, data, loading, error };
};

const useLoginUser = () => {
  const [loginUserMutation, { data, loading, error }] = useMutation(LOGIN_USER);

  const loginUser = async ({ email, password }) => {
    try {
      const response = await loginUserMutation({
        variables: { email, password },
      });
      return response.data?.loginUser;
    } catch (err) {
      console.error("Login user error:", err);
      throw err;
    }
  };

  return { loginUser, data, loading, error };
};

const testUser = {
  name: "Test User",
  username: "testuser123",
  githubUsername: "testghuser",
  email: "testuser@example.com",
  password: "supersecure123",
  githubToken: "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",
};

let createdUser: any = null;

describe("User Controller Tests", () => {
  it("registers a user", async () => {
    createdUser = await userControllers.registerUser(
      testUser.name,
      testUser.username,
      testUser.githubUsername,
      testUser.email,
      testUser.password
    );

    expect(createdUser).toBeDefined();
    expect(createdUser.email).toBe(testUser.email);
    expect(createdUser.username).toBe(testUser.username);
  });

  it("logs in the user", async () => {
    const result = await userControllers.loginUser(
      testUser.email,
      testUser.password
    );

    expect(result).toBeDefined();
    expect(result.email).toBe(testUser.email);
    expect(result.accessToken).toBeDefined();
    expect(result.password).toBe("");
  });
});
