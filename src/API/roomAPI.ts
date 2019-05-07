import { IRoom } from './../Views/RoomChat/ChatAsDesign';
import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
export function getRoomById() : Promise<IRoom[]> {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getRoomById( id : "A"){
                            idUser
                            idRoom
                            idUserReceive
                            messages {
                                idUserReceive
                                idUser
                                contentMessage
                            }
                            ownerUserInfo{
                                name
                                avatarLink
                            }
                            clientInfo{
                                name
                                avatarLink
                            }
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))
    })
}
//MUTATION
 // hash tag not Mutation
 export function createRoom(input: any) : Promise<IRoom>{
     console.log('createRoo,',input  )
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
                mutation CreateRoom($input: inputRoom) {
                    createRoom(input: $input) {
                        idUser
                        idRoom
                        idUserReceive
                        ownerUserInfo{
                                name
                                avatarLink
                        }
                        clientInfo{
                                name
                                avatarLink
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
