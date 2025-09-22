export const envMutations = `#graphql
 registerNewEnv(name: String, value: String, id: String):EnvVariables
 updateEnvVariables(id: String,name:String,value: String):EnvVariables
 deleteEnvVariables(id: String): EnvVariables
`;
