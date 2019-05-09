import { IUsertype } from './userAPI';

import gql from "graphql-tag";
import { client } from "./client"
import { convertDataToGraphQL } from "../help/help"
import { IHashtTagType } from './hashtagAPI'
import { ICommentType } from './commentAPI'
import { IBookMarkType } from './bookmarkAPI'
export interface IArticleType {
    idArticle : string
    idUser : string
    category ?: string[]
    bookmark ?: IBookMarkType[]
    totalClap ?: number
    hashTag? : string[]
    contentArticle :string 
    imageArticle :string
    titleArticle :string
    createTime :string
    user :IUsertype
    hashTagData ?: IHashtTagType[]
    comment : ICommentType[]
}
export function addArticleToClient(input) {
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
            mutation AddArticle($input : ArticleInput) {
                addArticle(input : $input) {
                    idUser
                    hashTag
                    category
                    imageArticle
                    comment {
                            idUser
                            idArticle
                        }
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
export function updateArticleToClient(input: any) {
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

export function countArticle() : Promise<number> {
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
export function getArticleById(id)  : Promise<IArticleType>{
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
export function getAllArticle(first = 5, offset = 0) : Promise<IArticleType[]> {
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