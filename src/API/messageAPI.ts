import gql from "graphql-tag";
import { client } from "./client"
import { convertDataToGraphQL } from "help/help";
// add message not here, beause it add in socket 
export function getAllMessageByIdUserReceive(idRoom: string) {

    // why we query message idUserReceive beause ??? => 
    return new Promise(async  resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllMessageByIdUserReceive( id  :"${idRoom}"){
                            idUserReceive
                            idUser
                            contentMessage
                            ownerUserInfo{
                                name
                                idUser
                                avatarLink
                            }
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))
    })
}
