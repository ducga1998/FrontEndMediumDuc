import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { convertDataToGraphQL } from "../help/help";
const LINK = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
export const client = new ApolloClient({
    uri: `${LINK}/graphql`,
    // defaultOptions : defaultOptions
})
