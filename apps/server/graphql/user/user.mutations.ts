export const userMutations = `#graphql
    registerUser(name: String!, username: String!, githubUsername: String!, email: String!, password: String!): User

    loginUser(email: String!, password: String!): User
    verifyUser: User
`;
