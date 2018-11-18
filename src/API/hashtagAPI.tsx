import gql from "graphql-tag";
import { client } from "./client";
//QUERY
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
 // hash tag not Mutation

