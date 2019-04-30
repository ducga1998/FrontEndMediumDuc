import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
//QUERY
export function getArticleTagByIdHashTag(idHashTag) {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getArticleTagByIdHashTag( id  : "${idHashTag}"){
                            idArticle
                            idHashTag 
                            nameHashTag 
                        }
                    }
                    `
        })
       resolve(convertDataToGraphQL(API))
    })
}
export function getAllHashTag() : Promise<any> {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getHashTagAll {
                            idArticle
                            idHashTag 
                            nameHashTag 
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))
    })
}

