import gql from "graphql-tag";
import { client } from "./client";
//QUERY
export function getAllRoomFromBackEnd() {
    return new Promise(resolve => {
        const data = client.query({
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
        resolve(data)
    })
}


export function getRoomstoIdUser(idUser) {
    return new Promise(resolve => {
        const data = client.query({
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
        resolve(data)
    })
}
//MUTATION
 // hash tag not Mutation

