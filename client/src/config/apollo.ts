import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache({
        addTypename: false, // remove key __typename in query results
    }),
});

export default client;
