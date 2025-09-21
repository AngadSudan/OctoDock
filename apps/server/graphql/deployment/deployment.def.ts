export const deploymentDef = `#graphql
    type Deployment {
        id:ID!
        dockerImage: String!
        urlSlug: String!
        userId: [ID!]
        projectId: [ID!]
        createdAt:Date
        updatedAt:Date
    }
`;
