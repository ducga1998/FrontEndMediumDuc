import gql from "graphql-tag";
import { client } from "./client";
//QUERY
export function getHashTagByIdHashTag(idHashTag) {
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                    query {
                        getHashTagByIdHashTag( id  : "${idHashTag}"){
                            idUser
                            idHashTag
                            nameHashTag
                        }
                    }
                    `
        })
        resolve(data)
    })
}
export function getAllHashTag(idHashTag) : Promise<any> {
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                    query {
                        getHashTagByIdHashTag( id  : "${idHashTag}"){
                            idUser
                            idHashTag
                            nameHashTag
                        }
                    }
                    `
        })
        resolve(data)
    })
}

