import gql from "graphql-tag";
import { client } from "./client";
export function getAllInfomationUserFollowYour(idUser) {
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                    query {
                        getAllInfomationUserFollowYour( id  : "${idUser}"){
                            idUser
                            idUserFollow
                            userFollow {
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
//MUTATION
// define input  => idUser and idUserFollow 
export function follow(input: any) {
    return new Promise(resolve => {
        const data = client.mutate({
            mutation: gql`
              mutation Follow($input: FollowInput) {
                follow(input: $input) {
                    idUser
                    idUserFollow
                    userFollow {
                                name
                                avatarLink
                                articles {
                                    idArticle
                                }
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
export function unFollow(input: any) {
    return new Promise(resolve => {
        const data = client.mutate({
            mutation: gql`
              mutation UnFollow($input: FollowInput) {
                unFollow(input: $input) {
                    idUser
                    idUserFollow
                    userFollow {
                                name
                                avatarLink
                                articles {
                                    idArticle
                                }
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