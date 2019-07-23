import * as React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SubscribeOne } from "unstated-x";
import WriteArticle from 'Views//Article/WriteArticle';
import ReadArticle from 'Views/Article/ReadArticle';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from 'Views/Form/login';
import Register from "Views/Form/register";
import Home from "Views/Home";
import Layout from 'Views/Layout';
import Profile from 'Views/Profile/HomeProfile';
import ViewUser from 'Views/Profile/OtherProfile';
import userContainer from "Container/userContainer";
import UILoading from "Components/UI/UILoading";
import ChatMessage from 'Views/RoomChat/ChatAsDesign'
import { logoutBackend } from 'API/userAPI'
import { notificationFuncSocket } from "socketClient/notificationSocket";
import Stories from "Views/Article/Stories";
import StoreDetail from "Views/Article/Stories/Store";
import ArticleBookMark from "Views/Article/BookMarkArticle";
import history from 'historyRoute'
import { H1 } from "Components/styled/base";
import ManagerAccount from 'Views/User/Admin/ManagerAccount'
import ManagerArticles from 'Views/User/Admin/MangerArticle'

import PageEditer from "workspace/PageEditer";
import HashTagView from "Views/HashTagView";
import Community from "Views/Community";
const About = () => <div>
    Web design by Nguyen Minh duc
    <H1>Facebook : <a href="https://www.facebook.com/duc.ceh.cnna">https://www.facebook.com/duc.ceh.cnna</a></H1>
    <H1>GitHub : <a href="https://github.com/ducga1998">https://github.com/ducga1998</a></H1>
</div>


const { useEffect } = React as any
const AppRouter = () => {
    useEffect(() => {
        if (localStorage.getItem('duc-app-medium-login')) {
            const dataCache = localStorage.getItem('duc-app-medium-login')
            // console.log(dataCache)
            if (dataCache) {
                const dataUser = JSON.parse(dataCache)
                userContainer.setState({ dataUser, login: true })
            }
        }
    })
    const renderRoutes = (user: any) => {

        // this is function help me catch event socket to backend 
        notificationFuncSocket(user)

        function isAuth(component) {
            return user != null ? component : redirect('/login')
        }


        // check isAdmin ???  => {}   
        //admin thi hon so voi user thuong nhung cai gi ?
        // check on front end , these have admin => render  and check in request 
        // in request have info user => if it 's admin => allow 


        return <Router history={history} >
            <Switch>
                <Layout>
                    <Route exact path="/about/" component={About} />
                    <Route exact path="/user/:id" component={isAuth(ViewUser)} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={logout} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/article/:id" component={ReadArticle} />
                    <Route exact path="/home" component={isAuth(Home)} />
                    <Route exact path="/stories" component={isAuth(Stories)} />
                    <Route exact path="/store/:id" component={isAuth(StoreDetail)} />
                    <Route exact path="/profile" component={isAuth(Profile)} />
                    <Route exact path="" />
                    <Route exact path="/writearticle" component={isAuth(WriteArticle)} />
                    <Route exact path="/chatMessage/:id" component={isAuth(ChatMessage)} />
                    <Route exact path="/bookmarks" component={isAuth(ArticleBookMark)} />
                    <Route exact path="/drapdrop" component={PageEditer} />
                    <Route exact path="/hashtag/:name" component={HashTagView} />
                    <Route exact path="/community" component={Community} />
                    {user && user.decentraliz === 3 ? <>
                        <Route exact path="/managerAccount" component={isAuth(ManagerAccount)} />
                        <Route exact path="/managerArticles" component={isAuth(ManagerArticles)} />
                    </> : null}
                    <Route exact path="/" component={redirect('/login')} />

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
                    return <UILoading />
                }

                return renderRoutes(dataUser)
            }
        }
    </SubscribeOne>
}


export function redirect(location) {
    return class extends React.Component {
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
    useEffect(() => {
        localStorage.clear()
        userContainer.setState({ dataUser: null, login: false })
        history.push('/login')
        logoutBackend()
    })
    return null

}

export default AppRouter