import { projectResolver } from "./project.resolver";
import { projectDef } from "./project.def";
import { projectMutation } from "./project.mutations";
import { projectQueries } from "./project.queries";

export const Project = {
  projectDef,
  projectMutation,
  projectQueries,
  projectResolver,
};
