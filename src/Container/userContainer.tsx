import { Container } from 'unstated-x'
import { checkLoginUser } from '../API/client';
import { Redirect } from 'react-router';
// import {  } from 'react-router';
class UserContainer extends Container<any>{
    async login({ username, password }) {
        const { data: { checklogin } } = await checkLoginUser({ username, password }) as any
        console.log('checkLogin', checklogin)
        if (checklogin) {
            await this.setState({ login: true, dataUser: checklogin })
            // await this.setState({ dataUser: checklogin })
            // window.location.href = "/"
            // browserHistory.push('/register')
            return checklogin
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

