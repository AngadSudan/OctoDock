export const envMutations = `#graphql
 registerNewEnv(name: String, value: String, id: String):EnvVariables
 updateEnvVariables(id: String,name:String,id: String):EnvVariables
 deleteEnvVariables(id: String): EnvVariables
`;
