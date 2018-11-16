import * as React from 'react'
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../UI/styled/layout'
// import AppRouter from '../route'
const { useState, useEffect, useRef } = React
import { Col, Navbar, Nav, MenuItem, NavDropdown, NavItem, Button } from 'react-bootstrap';
import UIField from '../../UI/UIField'
import styled from 'styled-components';
import UIModal from '../../UI/UIModal'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import UIButton from '../../UI/UIButton';
import userContainer from '../../Container/userContainer'
import { toast } from 'react-toastify';
// import { __RouterContext } from "react-router";
function CheckUser(user, password) {
    if (user === 'admin' && password === 'admin') {
        console.log('ok')
        return true
    }
    return false
}
export default function Login({ history }) {
    const [name, setValueName] = useState('')
    const [password, setValuePassword] = useState('')
    const refLink: any = useRef(null)
    return <$Form>
        <h2 className="center">Login Accout</h2>
        <UIField titleField="Email and Name" placeholder="Email ..." value={name} onChange={(value) => { setValueName(value) }} />
        <UIField titleField="Password" placeholder="Password .... " value={password} onChange={(value) => {
            setValuePassword(value)
        }} />
        <Link to="/home" ref={refLink} />
        <UIButton onChange={async () => {
            const dataUser = await userContainer.login({ username: name, password })
            if (!dataUser) {
                toast.error('login false, please check user name and passwod')
            }
            else {
                // console.log(history)
                history.push('/home')
            }
            // console.log(RouterContext)
            // refLink.current.

            console.log(dataUser)
        }}>Login</UIButton>
        <UIButton  ><Link to='/register'>Register</Link></UIButton>
        {/* <UIModal trigger={<button>click</button>}>
            casnjkcnaskjnckasnkjcnkajsccalkcmasklmcamscmkalsmcklamskl
        </UIModal> */}
    </$Form>
}
const $Form = styled.div`
    width : 500px;
    .center {
        text-align : center;
        font-family: 'Ubuntu', sans-serif;
    color: #00b5ad;
    text-transform: uppercase;
    font-size: 3em;
    }
   
    
`