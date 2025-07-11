export const projectMutation = `#graphql
        createNewProject(userId: String!, name: String!, description: String!): Project
        deleteProject(projectId: String!, userId: String!): Project
        updateProject(
            name: String!,
            projectId: String!,
            userId: String!,
            description: String!
        ): Project
`;
