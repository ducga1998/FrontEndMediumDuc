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
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
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
                        }
                    }
                    `
        })
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}
//get all article in database
export function getAllArticle() {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllArticle(id  : ""){
                            
                                idArticle
                                idUser
                                hashTag
                                category
                                comment {
                                    idUser
                                    idArticle
                                    content
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
                                    password
                                    decentraliz
                                    name
                                    avatarLink
                                }
                            
                        }
                    }
                    `
        })
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})

    })

} 