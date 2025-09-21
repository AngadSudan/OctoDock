export const deploymentMutation = `#graphql
        createDeployment(dockerimage: String!,urlSlug: String!,projectId: String!): Deployment
        redeployProject(dockerimage: String!,urlSlug: String!,projectId:String!): Deployment
`;
