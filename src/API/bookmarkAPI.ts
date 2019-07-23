import { IArticleType } from 'API/articleAPI';
import { IUsertype } from './userAPI';
import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
export interface  IBookMarkType {
    idUser :string
    idArticle :string
    idUserBookMark ?: string
    userOwnArticle ?:IUsertype
    articleBookMark : IArticleType
}
export function bookMark(input ) : Promise<IBookMarkType> {
   
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
            mutation BookMark($input : bookmarkInput) {
                bookMark(input : $input) {
                    idUser
                    idArticle
                    idUserBookMark
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
export function getAllArticleHashBeenBookMark(idUser) : Promise<IBookMarkType[]> {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllArticleHasBeenBookMark(idUser :"${idUser}"){
                            idUser
                            idArticle
                            userOwnArticle {
                                name
                                avatarLink
                                idUser
                            }
                            articleBookMark{
                                idArticle
                                idUser
                                imageArticle
                                hashTagData {
                                    idHashTag
                                    nameHashTag
                                    idArticle
                                }
                                category
                                contentArticle
                                titleArticle
                                createTime
                            }
                }
            }
                    `
        })
        resolve(convertDataToGraphQL(API))

    })
}
// get all article in database
export function unBookMark(input) : Promise<IBookMarkType> {

    
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
            mutation unBookMark($input : bookmarkInput) {
                unBookMark(input : $input) {
                    idUser
                    idArticle
                    idUserBookMark
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
export function isBookMarkToClient({ idUser, idArticle }) :Promise<Boolean> {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        isBookMark(idUserBookMark:"${idUser}",idArticle : "${idArticle}")
                    }
                `
        })
        resolve(convertDataToGraphQL(API))

    })
}