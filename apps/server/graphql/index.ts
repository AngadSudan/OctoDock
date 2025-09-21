import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import User from "./user";
import { Project } from "./project";
import { Prompt } from "./prompt";
import { Deployment } from "./deployment";
import { envVariable } from "./env-variables";
const createApolloServer = async () => {
  // add prompt things later
  const typeDefs = gql(`
        scalar Date

        ${User.userDef}
        ${Project.projectDef}
        ${Prompt.promptDef}
        ${Deployment.deploymentDef}
        ${envVariable.envDef}
        type Query {
            ${User.userQueries}
            ${Project.projectQueries}
            ${Prompt.promptQueries}
            ${Deployment.deploymentQueries}
            ${envVariable.envQueries}
            }
            
            type Mutation {
              ${User.userMutations}
              ${Project.projectMutation}
              ${Prompt.promptMutation}
              ${Deployment.deploymentMutation}
              ${envVariable.envMutations}
              }
              `);
  const graphqlResolver = {
    Query: {
      ...User.userResolver.queries,
      ...Project.projectResolver.queries,
      ...Prompt.promptResolver.queries,
      ...Deployment.deploymentResolver.queries,
      ...envVariable.envResolver.queries,
    },
    Mutation: {
      ...User.userResolver.mutation,
      ...Project.projectResolver.mutations,
      ...Prompt.promptResolver.mutations,
      ...Deployment.deploymentResolver.mutations,
      ...envVariable.envResolver.mutations,
    },
  };
  interface MyContext {
    token?: String;
  }

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers: graphqlResolver,
  });

  // @ts-ignore
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
};

export default createApolloServer;
