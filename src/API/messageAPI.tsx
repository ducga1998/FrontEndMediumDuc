import gql from "graphql-tag";
import { client } from "./client"
import { convertDataToGraphQL } from "src/help/help";
// add message not here, beause it add in socket 
export function getAllMessageByIdUserReceive(idCommunication) {
    console.log('idCommunication' , idCommunication)
    // why we query message idUserReceive beause ??? => 
    return new Promise(async  resolve => {
        const API = await client.query({
            query: gql`
                    query {
                        getAllMessageByIdUserReceive( id  :"${idCommunication}"){
                            idUserReceive
                            idUser
                            contentMessage
                            idCommunication 
                            nameUserReveice
                        }
                    }
                    `
        })
        console.log('convertDataToGraphQL(API)',API)
        resolve(convertDataToGraphQL(API))
    })
}

// export function getRoomChat(idCommunication) {
//     // why we query message idUserReceive beause ??? => 
//     return new Promise(async  resolve => {
//         const API = await client.query({
//             query: gql`
//                     query {
//                         getRoomChat( id  : "${idCommunication}"){
//                             idUserReceive
//                             idUser
//                             contentMessage
//                             idCommunication 
//                             nameUserReveice
//                         }
//                     }
//                     `
//         })
//         console.log('API',API)
//         if (API) resolve(convertDataToGraphQL(API))
//         resolve({})
//     })
// }