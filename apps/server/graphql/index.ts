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
            ${Prompt.promptMutation}
            ${Project.projectMutation}
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
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers: graphqlResolver }),
  });
  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
};

export default createApolloServer;
