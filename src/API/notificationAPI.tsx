import { client } from "./client";
import gql from "graphql-tag";
import { convertDataToGraphQL } from "../help/help";
import userContainer from "../Container/userContainer";

export function getAllNotificationByIdUser(first , offset) {
    const {idUser} = userContainer.state.dataUser
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                query {
                    getAllNotifiOfUser( id : "${idUser}" , first :${first} , offset : ${offset} ){
                        idNotification
                        idUser
                        type
                        notificationData
                        time 
                }
            }
            `
        })
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}