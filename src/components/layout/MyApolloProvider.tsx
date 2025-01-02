import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
// import { Outlet } from "react-router";

import { useAppSelector } from "@/redux/store";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ReactNode } from "react";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  // link: createHttpLink({
  //   uri: "http://localhost:4000/graphql",
  //   credentials: "include",
  //   headers: (token) => ({
  //     authorization: token ? `Bearer ${token}` : "",
  //   }),
  // }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
  },
  connectToDevTools: true,
});

export default function MyApolloProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { token } = useAppSelector((state) => state.auth);

  const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === "production"
        ? "https://lela.hertzopshub.com/graphql"
        : "http://localhost:5000/graphql",
    // credentials: 'include',
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url:
        process.env.NODE_ENV === "production"
          ? "wss://ec2-44-197-108-29.compute-1.amazonaws.com/graphql"
          : "wss://ec2-44-197-108-29.compute-1.amazonaws.com/graphql",
      connectionParams: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  apolloClient.setLink(splitLink);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
