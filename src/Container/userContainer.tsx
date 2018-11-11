import { Container } from 'unstated-x'
import { checkLoginUser } from '../API/client';
import { Redirect } from 'react-router';
// import {  } from 'react-router';
class UserContainer extends Container<any>{
    async login({ username, password }) {
        const { data: { checklogin } } = await checkLoginUser({ username, password }) as any
        if (checklogin) {
            await this.setState({ login: true })
            window.location.href = "/regveds"
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
    login: false
})
// window.user = userContainer
export default userContainer

