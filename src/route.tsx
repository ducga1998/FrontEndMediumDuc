import * as React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SubscribeOne } from "unstated-x";
import WriteArticle from './Component//Article/WriteArticle';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Component/Form/login';
import Register from "./Component/Form/register";
import Home from "./Component/Home";
import Layout from './Component/Layout';
import Profile from './Component/Profile/common';
import userContainer from "./Container/userContainer";
import UILoading from "./UI/UILoading";
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

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

        function isAuth(component) {
            return user != null ? component : redirect('/login')
        }
        return <Router >
            <Switch>
                <Layout >
                    {/* <Route path="/" component={Home} /> */}
                    <Route path="/about/" component={isAuth(About)} />
                    <Route path="/users/:id" component={isAuth(Users)} />
                    <Route path="/article/:id" component={isAuth(Users)} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={isAuth(Home)} />
                    <Route path="/profile" component={isAuth(Profile)} />
                    <Route path="/writearticle" component={isAuth(WriteArticle)} />
                    WriteArticle
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
    React.useEffect(() => {
        localStorage.clear()
        userContainer.setState({ dataUser: null, login: false })
        history.push('/login')
    })
    return null

}

export default AppRouter