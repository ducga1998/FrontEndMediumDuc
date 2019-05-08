import { client } from "./client";
import gql from "graphql-tag";
import { convertDataToGraphQL } from "../help/help";
import userContainer from "../Container/userContainer";
export interface IdNotificationType {
    idNotification ?:string 
    idUser ?:string  
    type  ?: string
    notificationData ?: any
    time ?: string 
}
export function getAllNotificationByIdUser(first , offset) : Promise<IdNotificationType[]> {
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
        resolve(convertDataToGraphQL(API))
    })
}