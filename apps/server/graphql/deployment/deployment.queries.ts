export const deploymentQueries = `#graphql
    getAllUserDeployment(id:ID!):[Deployment]
    getDeploymentByProject(projectId: ID!): Project
`;
