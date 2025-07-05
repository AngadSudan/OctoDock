import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import type { Express } from "express";
import express from "express";

import User from "./user";

const createApolloServer = async (app: Express) => {
  const typeDefs = gql(`

        ${User.userDef}

        type Query {
            ${User.userQueries}
        }

        type Mutation {
            ${User.userMutations}
        }
    `);
  const graphqlResolver = {
    Query: {
      ...User.userResolver.queries,
    },
    Mutation: {
      ...User.userResolver.mutation,
    },
  };
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers: graphqlResolver }),
  });
  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
};

export default createApolloServer;
