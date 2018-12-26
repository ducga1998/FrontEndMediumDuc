import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
export function getAllInfomationUserFollowYour(idUser) {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllInfomationUserFollowYour( id  : "${idUser}"){
                            idUser
                            idUserFollow
                            userFollow {
                                name
                                avatarLink
                                idUser
                            }
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API));

    })
}
//MUTATION
// define input  => idUser and idUserFollow 
export function follow(input: any) {
    console.log('input follow', input)
    return new Promise(async resolve => {
        const API = await client.mutate({
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

        if (API) {
            // const { data: { addCommentIntoArticle } } = API
            resolve(convertDataToGraphQL(API));
        }
        resolve({})
    })
}
export function unFollow(input: any) {
    return new Promise(async resolve => {
        const API = await client.mutate({
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
        if (API) {
            // const { data: { addCommentIntoArticle } } = API
            resolve(convertDataToGraphQL(API));
        }
        resolve({})
    })
}