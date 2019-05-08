import ApolloClient from "apollo-boost";
const LINK = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
export const client = new ApolloClient({
    uri: `${LINK}/graphql`,
    // defaultOptions : defaultOptions
})
