import { IArticleType } from './articleAPI';
import gql from "graphql-tag";
import { convertDataToGraphQL } from "../help/help";
import { client } from "./client";
export interface IUsertype {
    idUser :string 
    name ?:string
    avatarLink ?:string
    biographical ?:string
    birthday ?:string
    location ?:string
    articles ?: IArticleType[]
}
export function logoutBackend() {
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                query {
                    logout(id : "sacscas") {
                        idUser
                    }
                }
            `
        })
        resolve(data)
    })
}
export function updateInfomation(input) :Promise<IUsertype> {
    return new Promise(async resolve => {
        const API = client.mutate({
            mutation: gql`
              mutation UpdateInfomationUser($input: UserInput) {
                updateInfomationUser(input: $input) {
                    idUser
                    login
                    password
                    decentraliz
                    name
                    avatarLink
                }
            }
            `,
            variables: {
                input
            }
        })
        resolve(convertDataToGraphQL(API))
    })
}
export function deleteUserById(id:string) :Promise<IUsertype> {
    return new Promise(async resolve => {
        const API = client.mutate({
            mutation: gql`
              mutation DeleteUserById($id: String) {
                deleteUserById(id: $id) {
                    idUser
                    login
                    password
                    decentraliz
                    name
                    avatarLink
                }
            }
            `,
            variables: {
                id
            }
        })
        resolve(convertDataToGraphQL(API))

    })
}
export function addUser(user) :Promise<IUsertype>{
    const { idUser, login, password, decentraliz, avatarLink, name } = user
    const input = {
        idUser, login, password, decentraliz, avatarLink, name
    }
    return new Promise(async resolve => {
        const API = client.mutate({
            mutation: gql`
              mutation AddNewUser($input: UserInput) {
                addNewUser(input: $input) {
                    idUser
                    login
                    password
                    decentraliz
                    name
                    avatarLink
                }
            }
            `,
            variables: {
                input
            }
        })
        resolve(convertDataToGraphQL(API))

    })
}
//QUERY
export function getAllInformationUser(idUser: string)  :Promise<IUsertype> {

    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                query {
                    getAllInformationUser( id : "${idUser}" ){
                    idUser
                    name
                    avatarLink
                    biographical
                    birthday
                    location
                    biographical
                    articles {
                        idArticle
                        category
                        comment {
                            idUser
                            idArticle
                        }
                        hashTagData {
                            idHashTag
                            nameHashTag
                            idArticle
                        }
                        totalClap
                        notification
                        contentArticle  
                        titleArticle  
                        imageArticle 
                        createTime 
                        user {
                                idUser
                                login
                                name
                                avatarLink
                            }
                    }
                }
            }
            `
        })
        resolve(convertDataToGraphQL(API))

    })
}
export function checkLoginUser(user: {username : string  , password : string}) {
    const { username, password } = user;
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                query {
                checklogin( username :"${username}" , password :"${password}" ){
                    idUser
                    login
                    name
                    avatarLink
                    decentraliz
                    biographical
                    articles {
                        idArticle
                        hashTag
                        category
                        comment {
                            idUser
                            idArticle
                        } 
                        totalClap
                        notification
                        contentArticle  
                        titleArticle  
                        imageArticle 
                        createTime 
                    }
                }
            }
            `
        })
        resolve(convertDataToGraphQL(API))

    })
}
export function getAllUser()  :Promise<IUsertype[]> {
    return new Promise(async resolve => {
        const API = await client.query({
            query: gql`
                query {
                    getAllUser{
                    idUser
                    name
                    avatarLink
                    biographical
                    birthday
                    location
                    biographical
                    decentraliz
                    articles {
                        idArticle                      
                    }
                }
            }
            `
        })
        resolve(convertDataToGraphQL(API))

    })
}

