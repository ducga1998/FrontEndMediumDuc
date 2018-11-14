import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './Component/Form/login'
import Register from "./Component/Form/register";
import Author from './Component/Author/index'
import Home from "./Component/Home";
import Layout from './Component/Layout';
import WriteArticle from './Component//Article/WriteArticle'
const Index = ({ history }) => {
    console.log('history', history)
    return <h2>Home</h2>;
}

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => {
    const authLink = (user) => {
        if (!user) {
            return
        }
        return null
    }
    return <Router>
        <Layout>
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/:id" component={Users} />
            <Route path="/article/:id" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/logout" />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Author} />
            <Route path="/writearticle" component={WriteArticle} />
            WriteArticle
        </Layout>
    </Router>
}

export default AppRouter