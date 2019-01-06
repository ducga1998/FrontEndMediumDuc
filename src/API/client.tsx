import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { convertDataToGraphQL } from "../help/help";
export const client = new ApolloClient({
    uri: "http://localhost:3000/graphql"
})
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
export function updateInfomation(user: any) {
    // const { idUser, login, password, decentraliz, avatarLink, name } = user
    const input = user
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
export function deleteUserById(id){
    
   
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
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}
export function addUser(user: any) {
    const { idUser, login, password, decentraliz, avatarLink, name } = user
    console.log('userrr', user)
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
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}
//QUERY
export function getAllInformationUser(idUser: string) {

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
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}
export function checkLoginUser(user: any) {
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
export function getAllUser() {

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
        if (API) resolve(convertDataToGraphQL(API))
        resolve({})
    })
}

export function addArticleToClient(article: any) {
    let input: any = article;
    console.log(input)
    return new Promise(async resolve => {
        const API = await client.mutate({
            mutation: gql`
            mutation AddArticle($input : ArticleInput) {
                addArticle(input : $input) {
                    idUser
                    hashTag
                    category
                    imageArticle
                    comment {
                            idUser
                            idArticle
                        }
                    totalClap
                    notification
                    createTime
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
