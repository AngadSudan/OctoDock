import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import User from "./user";
import { Project } from "./project";
import { Prompt } from "./prompt";

const createApolloServer = async () => {
  // add prompt things later
  const typeDefs = gql(`
        scalar Date

        ${User.userDef}
        ${Project.projectDef}
        ${Prompt.promptDef}
        type Query {
            ${User.userQueries}
            ${Project.projectQueries}
            ${Prompt.promptQueries}
        }

        type Mutation {
            ${User.userMutations}
            ${Project.projectMutation}
            ${Prompt.promptMutation}
        }
    `);
  const graphqlResolver = {
    Query: {
      ...User.userResolver.queries,
      ...Project.projectResolver.queries,
      ...Prompt.promptResolver.queries,
    },
    Mutation: {
      ...User.userResolver.mutation,
      ...Project.projectResolver.mutations,
      ...Prompt.promptResolver.mutations,
    },
  };
  interface MyContext {
    token?: String;
  }

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers: graphqlResolver,
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
};

export default createApolloServer;
