import * as React from "react";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SubscribeOne } from "unstated-x";
import WriteArticle from './Component//Article/WriteArticle';
import Author from './Component/Author/index';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Component/Form/login';
import Register from "./Component/Form/register";
import Home from "./Component/Home";
import Layout from './Component/Layout';
import userContainer from "./Container/userContainer";

const Index = ({ history }) => {
    console.log('history', history)
    return <h2>Home</h2>;
}
// console.log('BrowserRouter', history)
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;
// const isAuth = (component, ref?: any) => {
//     if (refApp && refApp.current) {
//         console.log(refApp)
//         refApp.current.history.push('login');
//     }
//     // return Login
//     userContainer._listeners.map(item => item())
//     const { login } = userContainer.state
//     // if (!login) {
//     //     location.href = "/home"
//     // }
//     // console.log(component)
//     return login ? component : Login
// }
const AppRouter = () => {
    const refApp: any = React.useRef(null)
    const authLink = (user) => {
        if (!user) {
            return
        }
        return null
    }

    React.useEffect(() => {
        if (localStorage.getItem('duc-app-medium-login')) {
        
            const dataCache = localStorage.getItem('duc-app-medium-login')
            console.log(dataCache)
            if (dataCache) {
              const  dataUser = JSON.parse(dataCache)
              userContainer.setState({dataUser , login : true})
            }

        }
    })
    // async function isAuth(component) {

    //     let checklogin;
    //     if (localStorage.getItem('duc-app-medium-login')) {
    //         const JSONdata = localStorage.getItem('duc-app-medium-login')
    //         if (JSONdata) {
    //             checklogin = JSON.parse(JSONdata)
    //         }

    //     }
    //     if (checklogin) {
    //         await this.setState({ login: true, dataUser: checklogin })
    //     }
    //     const { login } = userContainer.state
    //     // console.log(component)
    //     return component
    // }
    const renderRoutes = (user: any) => {
       
        function isAuth(component) {

            return user != null ? component : redirect('/login')
        }
        const requireUnauthen = (comp) => user != null ? redirect("/login") : comp;
        return <Router ref={refApp}>
            <Switch>
                <Layout>
                    {/* <Route path="/" component={Home} /> */}
                    <Route path="/about/" component={isAuth(About)} />
                    <Route path="/users/:id" component={isAuth(Users)} />
                    <Route path="/article/:id" component={isAuth(Users)} />
                    <Route path="/login" component={requireUnauthen(Login)} />
                    <Route path="/logout" component ={logout}/>
                    <Route path="/register" component={requireUnauthen(Register)} />
                    <Route path="/home" component={isAuth(Home)} />
                    <Route path="/profile" component={isAuth(Author)} />
                    <Route path="/writearticle" component={isAuth(WriteArticle)} />
                    WriteArticle
            </Layout>
            </Switch>
        </Router>
    }
    return <SubscribeOne to={userContainer} bind={['dataUser', 'login']} >
        {
            container => {
                const { login, dataUser } = userContainer.state
              
               

                return renderRoutes(dataUser)
            }
        }
    </SubscribeOne>
    debugger
}
function redirect(location) {
    return class RedirectRoute extends React.Component {
        constructor(props) {
            super(props)
            console.log(props)
            props.history.push(location);
        }
        render() {
            return null;
        }
    }
}
function logout({history}) {
    React.useEffect(() => {
        localStorage.clear()
        userContainer.setState({dataUser : null , login : false})
        history.push('/login')
    })
    return null
       
}
window['onLoad'] = (( a, b) => {
    
})
export default AppRouter