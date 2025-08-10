import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

import configuration from "@/conf/configuration";

const cache = new InMemoryCache();
await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

const client = new ApolloClient({
  uri: configuration.backend_url + "/graphql",
  cache,
});

export default client;
