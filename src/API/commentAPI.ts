import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
import { IUsertype } from "./userAPI";
import { IArticleType } from "./articleAPI";
//QUERIES 
export interface ICommentType {
    idUser :string
    idComment :string
    idArticle :string
    content :string
    createdAt : string
    idReply ?: string
    userComment ?: IUsertype
    articleComment ?:IArticleType
}
export function getAllCommentinArtcileCurrent(idUser: string , first :number , offset : number ): Promise<ICommentType[]>{
    console.log('999', idUser)
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        # add mechasim have idComment
                        getAllCommentInTheArticle(id:"${idUser}", first: ${first} ,offset:${offset} ){
                            idUser
                            idComment
                            idArticle
                            content
                            createdAt
                            idReply
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
export function addComment(input: { idComment : string ,  idUser: string,  content: string , idReply?: string }) :Promise<ICommentType>{
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
              mutation AddCommentIntoArticle($input: CommentInput) {
                addCommentIntoArticle(input: $input) {
                    idUser
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
                    createdAt
                }
            }
            `,
            variables: {
                input
            }
        },
        
    )

        // const { data: { addCommentIntoArticle } } = API
        resolve(convertDataToGraphQL(API));


    })
} 
export function addReplyComment(input: { idUser: string, idArticle: string, content: string , idReply :string }) : Promise<ICommentType> {
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
        resolve(convertDataToGraphQL(API));
    })
} 
