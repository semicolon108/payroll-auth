import { ApolloClient, InMemoryCache } from '@apollo/client';

const isProd = process.env.NODE_ENV === 'production' && true


export const loginURL = isProd ? 'https://app.hr-sabai.com' : 'http://localhost:8080'
const baseURL = isProd ? 'https://hr-sabai.com/graphql' : 'http://localhost:4000/graphql'


const apolloClient = new ApolloClient({
    uri: baseURL,
    cache: new InMemoryCache()
});


export default apolloClient