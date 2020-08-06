import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

export const client = new ApolloClient({
  uri: "https://ferry-time.herokuapp.com/v1alpha1/graphql",
  fetch
});
