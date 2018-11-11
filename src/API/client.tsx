import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
const client = new ApolloClient({
    uri: "http://localhost:3000/graphql"
})
export function addUser(user: any) {
    const { idUser, login, password, decentraliz } = user
    const input = {
        idUser, login, password, decentraliz
    }
    return new Promise(resolve => {
        const data = client.mutate({
            mutation: gql`
              mutation AddNewUser($input: UserInput) {
                addNewUser(input: $input) {
                    idUser
                    login
                    password
                    decentraliz
                }
            }
            `,
            variables: {
                input
            }
        })
        resolve(data);
    })
}
//QUERY
export function checkLoginUser(user: any) {
    const { login, password } = user;
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                query {
                checklogin( username :"${login}" , password :"${password}" ){
                password,
                login,
                decentraliz,
                idUser
                }
            }
            `
        })
    })
}