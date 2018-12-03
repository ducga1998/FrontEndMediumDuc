import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
//QUERY
export function getAllRoomFromBackEnd() {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllRoom( id  : "vsdv"){
                            idUser
                            idRoom
                            connections {
                                idUser
                                socketid
                            }
                            title
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))
    })
}


export function getRoomstoIdUser(idUser) {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getRoomByIdUser( id : "${idUser}"){
                            idUser
                            idRoom
                            connections {
                                idUser
                                socketid
                            }
                            title
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))
    })
}
//MUTATION
 // hash tag not Mutation

