import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
//QUERY
export function getArticleTagByNameHashTag(idHashTag) {
    console.log('idHashTag==>',idHashTag)
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getArticleTagByNameHashTag( id  : "${idHashTag}"){
                            idArticle
                            idUser
                            hashTag
                            category
                            comment {
                                idUser
                                idArticle
                                content
                            }
                            bookmark {
                                idUserBookMark
                            }
                            totalClap
                            notification
                            contentArticle
                            imageArticle
                            titleArticle
                            createTime
                            user {
                                idUser
                                login
                        
                
                                name
                                avatarLink
                                articles {
                                    idArticle
                                }
                            }
                            hashTagData {
                                idHashTag
                                nameHashTag
                                idArticle
                            }
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

