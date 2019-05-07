import { Container } from 'unstated-x';
import { checkLoginUser, updateInfomation } from '../API/userAPI';
// import {  } from 'react-router';
interface IUserContainer {
    dataUser : any ,
    login : boolean
}
class UserContainer extends Container<IUserContainer>{
    async login({ username, password }) {
        let dataUser = await checkLoginUser({ username, password }) as any
        if (localStorage.getItem('duc-app-medium-login')) {
            const JSONdata = localStorage.getItem('duc-app-medium-login')
            if (JSONdata) {
                dataUser = JSON.parse(JSONdata)
            }

        }
        if (dataUser) {
            await this.setState({ login: true, dataUser })
            localStorage.setItem('duc-app-medium-login', JSON.stringify(dataUser))
            return dataUser
        }
        else {
            await this.setState({ login: false })
        }
        return null
    }
    async updateProfile(input) {
        const { idUser } = this.state.dataUser
        const data = { ...input, ...{ idUser } }
        const newInfoUser = await updateInfomation(data)
        console.log('newInfoUser', newInfoUser)
        return newInfoUser
    }
}
const userContainer = new UserContainer({
    login: false,
    dataUser: null
})
window['user'] = userContainer
export default userContainer

