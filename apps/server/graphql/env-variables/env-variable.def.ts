export const envDef = `#graphql
    type EnvVariables {
        id:ID!
        name: String!
        value: String!
        projectId: String!
        project: [ID!]
        createdAt:Date
        updatedAt:Date
    }
`;
