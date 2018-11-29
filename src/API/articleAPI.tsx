import gql from "graphql-tag";
import { client } from "./client";
export function updateArticleToClient(article: any) {
    console.log('article', article)
    let input: any = article;
    console.log(input)
    return new Promise(resolve => {
        const data = client.mutate({
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
        resolve(data)
    })
}
export function getArticleById(id) {
    return new Promise(resolve => {
        const data = client.query({
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
        resolve(data)
    })
}
//get all article in database
export function getAllArticle() {
    return new Promise(resolve => {
        const data = client.query({
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
        resolve(data)
    })
} 