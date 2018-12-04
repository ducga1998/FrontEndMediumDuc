import { Container } from 'unstated-x';
import { checkLoginUser } from '../API/client';
// import {  } from 'react-router';
class UserContainer extends Container<any>{
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
}
const userContainer = new UserContainer({
    login: false,
    dataUser: null
})
window['user'] = userContainer
export default userContainer

