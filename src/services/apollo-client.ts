import { ApolloClient, InMemoryCache } from '@apollo/client';

const isProd = process.env.NODE_ENV === 'production' ? true : false

const baseURL = isProd ? 'https://payroll.sabai.la/graphql' : 'http://localhost:4000/graphql'

const apolloClient = new ApolloClient({
    uri: baseURL,
    cache: new InMemoryCache()
});

export default apolloClient