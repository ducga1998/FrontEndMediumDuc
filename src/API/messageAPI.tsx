import gql from "graphql-tag";
import { client } from "./client";
export function getMessageByIdRoom(idroom) {
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                    query {
                        getAllMessageByIdRoom( id  : "${idroom}"){
                            idRoom
                            idUser
                            content 
                            userMessage {
                                name
                                avatarLink
                                idUser
                            }  
                            roomMessage {
                                idUser
                                idRoom
                            }
                        }
                    }
                    `
        })
        resolve(data)
    })
}