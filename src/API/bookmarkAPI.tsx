import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
export function bookMark(bookMark: any) {
    console.log('bookMark', bookMark)
    let input: any = bookMark;
    console.log(input)
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
            mutation BookMark($input : bookmarkInput) {
                bookMark(input : $input) {
                    idUser
                    idArticle
                    idUserBookMark
                    userBookMark {
                        name
                        avatarLink
                    }
                    userOwnArticle {
                        name
                        avatarLink
                    }
                    articleBookMark{
                        idArticle
                        idUser
                        hashTag
                        category
                    }
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
export function getAllArticleHashBeenBookMark(idUser) {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllArticleHasBeenBookMark(idUser :"${idUser}"){
                            idUser
                            idArticle
                            idUserBookMark
                            userBookMark{
                                name
                                avatarLink
                            }
                            userOwnArticle {
                                name
                                avatarLink
                            }
                            articleBookMark{
                                idArticle
                                idUser
                                hashTag
                                category
                            }
                }
            }
                    `
        })
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}
// get all article in database
export function unBookMark(bookMark: any) {
    console.log('bookMark', bookMark)
    let input: any = bookMark;
    console.log(input)
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
            mutation unBookMark($input : bookmarkInput) {
                unBookMark(input : $input) {
                    idUser
                    idArticle
                    idUserBookMark
                    userBookMark {
                        name
                                avatarLink
                    }
                    userOwnArticle {
                        name
                        avatarLink
                    }
                    articleBookMark{
                        idArticle
                        idUser
                        hashTag
                        category
                    }
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
export function isBookMarkToClient({ idUser, idArticle }) {
    console.log('isBookMarkToClient', idArticle, idUser)
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        isBookMark(idUserBookMark:"${idUser}",idArticle : "${idArticle}")
                    }
                `
        })
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}