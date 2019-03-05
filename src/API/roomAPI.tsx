import gql from "graphql-tag";
import { client } from "./client";
import { convertDataToGraphQL } from "../help/help";
export function getRoomById() {
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
                        }
                    }
                    `
        })
        resolve(convertDataToGraphQL(API))
    })
}
//MUTATION
 // hash tag not Mutation
 export function createRoom(input: any) {
     console.log('createRoo,',input  )
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
                mutation CreateRoom($input: inputRoom) {
                    createRoom(input: $input) {
                        idUser
                        idRoom
                        idUserReceive
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
