"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutations = void 0;
exports.userMutations = `#graphql
    registerUser(name: String!, username: String!, githubUsername: String!, email: String!, password: String!): User

    loginUser(email: String!, password: String!): User
    verifyUser: User
`;
