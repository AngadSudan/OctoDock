export const envMutations = `#graphql
 registerNewEnv(name: String, value: String, projectId: String):EnvVariables
 updateEnvVariables(id: String):EnvVariables
 deleteEnvVariables(id: String): EnvVariables
`;
