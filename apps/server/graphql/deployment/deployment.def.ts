export const deploymentDef = `#graphql
type Deployment {
  id: ID!
  dockerImage: String!
  urlSlug: String!
  userId: ID!
  user: User
  project: Project
  projectId: ID!
  createdAt: Date
  updatedAt: Date
}
`;
