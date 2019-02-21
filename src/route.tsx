import * as React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SubscribeOne } from "unstated-x";
import WriteArticle from './Views//Article/WriteArticle';
import ReadArticle from './Views/Article/ReadArticle';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Views/Form/login';
import Register from "./Views/Form/register";
import Home from "./Views/Home";
import Layout from './Views/Layout';
import Profile from './Views/Profile/profileUserCurrent';
import ViewUser from './Views/Profile/profileUserCommon';
import userContainer from "./Container/userContainer";
import UILoading from "./Components/UI/UILoading";
import AllRoomChat from './Views/RoomChat/listRoom'
import ChatMessage from './Views/RoomChat/ChatAsDesign'
import DetailRoomChat from './Views/RoomChat/DetailRoomChat'
import { logoutBackend } from './API/client'
import { notificationFuncSocket } from "./socketClient/notificationSocket";
import Stories from "./Views/Article/Stories";
import StoreDetail from "./Views/Article/Stories/Store";
import ArticleBookMark from "./Views/Article/BookMarkArticle";
import history from './history'
import { H1 } from "./Components/styled/base";
import ManagerAccount from './Views/User/Admin/ManagerAccount'
import ManagerArticles from './Views/User/Admin/MangerArticle'
const About = () => <div>
    Web design by Nguyen Minh duc
    <H1>Facebook : <a href="https://www.facebook.com/duc.ceh.cnna">https://www.facebook.com/duc.ceh.cnna</a></H1>
    <H1>GitHub : <a href="https://github.com/ducga1998">https://github.com/ducga1998</a></H1>
</div>


const { useEffect } = React as any
const AppRouter = () => {
    useEffect(async () => {
        if (localStorage.getItem('duc-app-medium-login')) {

            const dataCache = localStorage.getItem('duc-app-medium-login')
            // console.log(dataCache)
            if (dataCache) {
                const dataUser = JSON.parse(dataCache)
                await userContainer.setState({ dataUser, login: true })
            }
        }
    })
    const renderRoutes = (user: any) => {
    
        // this is function help me catch event socket to backend 
        notificationFuncSocket(user)
        
        function isAuth(component) {
            return user != null ? component: redirect('/login')
        }
        
        
        // check isAdmin ???  => {}   
        //admin thi hon so voi user thuong nhung cai gi ?
        // check on front end , these have admin => render  and check in request 
        // in request have info user => if it 's admin => allow 
        

        return <Router history={history} >
            <Switch>
                <Layout>
                    <Route path="/chat" component={isAuth(AllRoomChat)} />
                    <Route path="/about/" component={About} />
                    <Route path="/user/:id" component={isAuth(ViewUser)} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/article/:id" component={ReadArticle} />
                    <Route path="/home" component={isAuth(Home)} />
                    <Route path="/stories" component={isAuth(Stories)} />
                    <Route path="/store/:id" component={isAuth(StoreDetail)} />
                    <Route path="/profile" component={isAuth(Profile)} />
                    <Route path="/writearticle" component={isAuth(WriteArticle)} />
                    <Route path="/chatRoom/:id" component={isAuth(DetailRoomChat)} />
                    <Route path="/chatMessage" component= {isAuth(ChatMessage)} />
                    <Route path="/bookmarks" component={isAuth(ArticleBookMark)} />
                    {user && user.decentraliz === 3? <>  
                     <Route path ="/managerAccount" component={isAuth(ManagerAccount)} />
                    <Route path ="/managerArticles" component={isAuth(ManagerArticles)} />
                    </>:null}
                 
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
    return class     extends React.Component {
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
        history.push('/login')
        await logoutBackend()
        // const data = await logoutBackend()
        // console.log('logout',data)
    })
    return null

}

export default AppRouter