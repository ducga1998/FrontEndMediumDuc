import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
export function updateArticleToClient(article: any) {
    console.log('article', article)
    let input: any = article;
    console.log(input)
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
            mutation UpdateArticle($input : ArticleInput) {
                updateArticle(input : $input) {
                    idUser
                    hashTag
                    imageArticle
                    category
                    totalClap
                    notification
                    createTime
                }
            }
          `,
            variables: {
                input
            }
        })
        resolve(convertDataToGraphQL(API))
    })
}
export function getDataSearch() {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getDataSearch(id: "ascsd"){
                            idArticle
                            titleArticle
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))
    })
}

export function countArticle() {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        countArticle
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))

    })
}
export function getArticleById(id) {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getArticleById(id :"${id}"){
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
//get all article in database
export function getAllArticle(first = 5, offset = 0) {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllArticle(first : ${first},offset: ${offset}){
                                idArticle
                                idUser
                                hashTag
                                category
                                bookmark {
                                    idUserBookMark
                                }
                                totalClap
                                contentArticle
                                imageArticle
                                titleArticle
                                createTime
                                user {
                                    idUser
                                    login
                                    password
                                    decentraliz
                                    name
                                    avatarLink
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