import userControllers from "../../controller/user.controllers";
const queries = {
  getUserProfile: async (_, {}) => {
    return await userControllers.getUserProfile();
  },
};
const mutation = {
  registerUser: async (
    _: any,
    {
      name,
      username,
      githubUsername,
      email,
      password,
    }: {
      name: string;
      username: string;
      githubUsername: string;
      email: string;
      password: string;
    }
  ) => {
    return await userControllers.registerUser(
      name,
      username,
      githubUsername,
      email,
      password
    );
  },
  loginUser: async (
    _,
    { email, password }: { email: string; password: string }
  ) => {
    return await userControllers.loginUser(email, password);
  },
  verifyUser: async (_, {}) => {
    return await userControllers.verifyUser();
  },
};

export const userResolver = { queries, mutation };
