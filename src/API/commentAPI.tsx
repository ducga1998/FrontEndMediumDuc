import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
//QUERIES 
export function getAllCommentinArtcileCurrent(idUser: string) {
    console.log('999', idUser)
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        # add mechasim have idComment
                        getAllCommentInTheArticle(id:"${idUser}"){
                            idUser
                            idComment
                            idArticle
                            content
                            createdAt
                            idRely
                            userComment {
                                name
                                avatarLink

                            }
                            articleComment {
                                idUser
                                createTime
                            }
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))

    })
}
//MUATION 
// this is function felp we add comment into a article , 
// input : idArticle and  content comment ?  . Iam not sure  :v 
export function addComment(input: { idComment : string ,  idUser: string, idArticle: string, content: string , idRely?: string }) {
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
              mutation AddCommentIntoArticle($input: CommentInput) {
                addCommentIntoArticle(input: $input) {
                    idUser
                    idArticle
                    content
                    idComment
                    userComment {
                        name
                        avatarLink
                    }
                    articleComment {
                        idUser
                        createTime
                    }
                }
            }
            `,
            variables: {
                input
            }
        })

        // const { data: { addCommentIntoArticle } } = API
        resolve(convertDataToGraphQL(API));


    })
} 
export function addRelyComment(input: { idUser: string, idArticle: string, content: string , idRely :string }) {
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
              mutation AddCommentIntoArticle($input: CommentInput) {
                addCommentIntoArticle(input: $input) {
                    idUser
                    idArticle
                    content
                    userComment {
                        name
                        avatarLink
                    }
                    articleComment {
                        idUser
                        createTime
                    }
                }
            }
            `,
            variables: {
                input
            }
        })

        // const { data: { addCommentIntoArticle } } = API
        resolve(convertDataToGraphQL(API));


    })
} 
