import gql from "graphql-tag";
import { client } from "./client";

export function getAllInfomationUserFollowYour(idUser: string) {
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                    query {
                        getAllInfomationUserFollowYour( id  : "${idUser}"){
                            idUser
                            idUserFollow
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
        resolve(data)
    })
}
//MUATION 
// this is function felp we add comment into a article , 
// input : idArticle and  content comment ?  . Iam not sure  :v 
export function addComment(input: { idUser: string, idUserFollow: string }) {
    return new Promise(resolve => {
        const data = client.mutate({
            mutation: gql`
              mutation AddCommentIntoArticle($input: CommentInput) {
                addCommentIntoArticle(input: $input) {
                    idUser
                    idUserFollow
                    userComment
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
        resolve(data);
    })
}
