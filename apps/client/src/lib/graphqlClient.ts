import { ApolloClient, InMemoryCache } from "@apollo/client";
import configuration from "@/conf/configuration";
const client = new ApolloClient({
  uri: configuration.backend_url + "/graphql",
  cache: new InMemoryCache(),
});

export default client;
