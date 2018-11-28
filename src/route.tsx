import * as React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SubscribeOne } from "unstated-x";
import WriteArticle from './Component//Article/WriteArticle';
import ReadArticle from './Component/Article/ReadArticle';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Component/Form/login';
import Register from "./Component/Form/register";
import Home from "./Component/Home";
import Layout from './Component/Layout';
import Profile from './Component/Profile/profileUserCurrent';
import ViewUser from './Component/Profile/profileUserCommon';
import userContainer from "./Container/userContainer";
import UILoading from "./UI/UILoading";
import AllRoomChat from './Component/RoomChat/listRoom'
import DetailRoomChat from './Component/RoomChat/DetailRoomChat'
import { logoutBackend } from './API/client'
import { notificationSocket } from "./socketClient/socket";
import { toast } from "react-toastify";
const About = () => <div>
    Web design by Nguyen Minh duc
    <h5>Facebook : <a>https://www.facebook.com/duc.ceh.cnna</a></h5>
    <h5>GitHub : <a>https://github.com/ducga1998</a></h5>
</div>


const { useEffect } = React as any
const AppRouter = () => {
    useEffect(async () => {
        if (localStorage.getItem('duc-app-medium-login')) {

            const dataCache = localStorage.getItem('duc-app-medium-login')
            console.log(dataCache)
            if (dataCache) {
                const dataUser = JSON.parse(dataCache)
                await userContainer.setState({ dataUser, login: true })
            }
        }
    })
    const renderRoutes = (user: any) => {
        if (user) {

            notificationSocket.on('notificationRun', (data) => {
                // name, titleArticle , content
                //     titleArticle,
                // content,
                // name,
                // type
                // avatarLink
                const { titleArticle, content, name, type, avatarLink } = data
                toast.info(`${name} đã ${type} vào bài viết có title : ${titleArticle} với nội dung ${content}`, {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
        }

        function isAuth(component) {
            return user != null ? component : redirect('/login')
        }

        return <Router >
            <Switch>
                <Layout >
                    <Route path="/chat" component={isAuth(AllRoomChat)} />
                    <Route path="/about/" component={isAuth(About)} />
                    <Route path="/user/:id" component={isAuth(ViewUser)} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/article/:id" component={ReadArticle} />
                    <Route path="/home" component={isAuth(Home)} />
                    <Route path="/profile" component={isAuth(Profile)} />
                    <Route path="/writearticle" component={isAuth(WriteArticle)} />
                    <Route path="/chatRoom/:id" component={isAuth(DetailRoomChat)} />
                </Layout>
            </Switch>
        </Router>
    }
    return <SubscribeOne to={userContainer} bind={['dataUser', 'login']} >
        {
            container => {
                const { dataUser } = container.state
                const dataCache = localStorage.getItem('duc-app-medium-login')
                if (dataCache && !dataUser) {
                    return <UILoading link="A" />
                }

                return renderRoutes(dataUser)



            }
        }
    </SubscribeOne>
}
function redirect(location) {
    return class RedirectRoute extends React.Component {
        constructor(props) {
            super(props)
            props.history.push(location);
        }
        render() {
            return null;
        }
    }
}
function logout({ history }) {
    useEffect(async () => {
        localStorage.clear()
        await userContainer.setState({ dataUser: null, login: false })
        // const data = await logoutBackend()
        // console.log('logout',data)
        history.push('/login')
    })
    return null

}

export default AppRouter