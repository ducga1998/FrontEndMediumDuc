import * as React from 'react'
const { useState, useEffect } = React
import { Col, Navbar, Nav, MenuItem, NavDropdown, NavItem, Button } from 'react-bootstrap';
import UIField from '../../UI/UIField'
import styled from 'styled-components';
import { Link } from "react-router-dom"
import UIModal from '../../UI/UIModal'
import UIButton from '../../UI/UIButton'
function CheckUser(user, password) {
    if (user === 'admin' && password === 'admin') {
        console.log('ok')
        return true
    }
    return false
}
export default function Register() {
    const [name, setValueName] = useState('')
    const [password, setValuePassword] = useState('')

    return <$Form>
        <h2 className="center">Register</h2>
        <UIField titleField="Email and Name" placeholder="Email ..." value={name} onChange={(value) => { setValueName(value) }} />
        <UIField type="password" titleField="Password" placeholder="Password .... " value={password} onChange={(value) => {
            setValuePassword(value)
        }} />
        <UIField type="password" titleField=" Rely Password" placeholder="Password .... " value={password} onChange={(value) => {
            setValuePassword(value)
        }} />

        <UIButton onClick={() => {
            console.log(name, password)
        }}>Register</UIButton>
        <UIButton> <Link to='/login'> Back </Link> </UIButton>
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