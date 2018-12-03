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
                        getAllCommentInTheArticle(id:"${idUser}"){
                            idUser
                            idArticle
                            content
                            createdAt
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
        if (API) {
            resolve(convertDataToGraphQL(API))
        }
        resolve({})

    })
}
//MUATION 
// this is function felp we add comment into a article , 
// input : idArticle and  content comment ?  . Iam not sure  :v 
export function addComment(input: { idUser: string, idArticle: string, content: string }) {
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
        if (API) {
            // const { data: { addCommentIntoArticle } } = API
            resolve(convertDataToGraphQL(API));
        }
        resolve({})

    })
}
