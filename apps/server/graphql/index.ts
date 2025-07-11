import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import type { Express } from "express";
import express from "express";

import User from "./user";
import { Project } from "./project";
import { Prompt } from "./prompt";

const createApolloServer = async (app: Express) => {
  // add prompt things later
  const typeDefs = gql(`
        scalar Date

        ${User.userDef}
        ${Project.projectDef}

        type Query {
            ${User.userQueries}
            ${Project.projectQueries}
        }

        type Mutation {
            ${User.userMutations}
            ${Project.projectMutation}
        }
    `);
  const graphqlResolver = {
    Query: {
      ...User.userResolver.queries,
      ...Project.projectResolver.queries,
      // ...Prompt.promptResolver.queries,
    },
    Mutation: {
      ...User.userResolver.mutation,
      ...Project.projectResolver.mutations,
      // ...Prompt.promptResolver.mutations,
    },
  };
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers: graphqlResolver }),
  });
  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
};

export default createApolloServer;
