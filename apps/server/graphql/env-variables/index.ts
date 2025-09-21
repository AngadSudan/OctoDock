import { envMutations } from "./env-variable.mutation";
import { envDef } from "./env-variable.def";
import { envQueries } from "./env-variable.queries";
import { envResolver } from "./env-variable.resolvers";

export const envVariable = {
  envMutations,
  envDef,
  envQueries,
  envResolver,
};
