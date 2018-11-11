import * as React from 'react'
const { useState, useEffect } = React
import { Col, Navbar, Nav, MenuItem, NavDropdown, NavItem, Button, Alert } from 'react-bootstrap';
import UIField from '../../UI/UIField'
import styled from 'styled-components';
import { Link } from "react-router-dom"
import UIModal from '../../UI/UIModal'
import UIButton from '../../UI/UIButton'
import uuid from 'uuid/v1'
import { addUser } from '../../API/client'
import { toast } from 'react-toastify';
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
    const [isRegister, setRegister] = useState(false)
    return <$Form>
        <h2 className="center">Register</h2>
        {!isRegister && name.length > 0 && password > 0 && password < 7 ? <Alert bsStyle="success"> Register Success </Alert> : <Alert bsStyle="warning">Register error </Alert>}

        <UIField titleField="Email and Name" placeholder="Email ..." value={name} onChange={(value) => { setValueName(value) }} />
        <UIField type="password" titleField="Password" placeholder="Password .... " value={password} onChange={(value) => {
            setValuePassword(value)
        }} />
        <UIField type="password" titleField=" Rely Password" placeholder="Password .... " value={password} onChange={(value) => {
            setValuePassword(value)
        }} />

        <UIButton onChange={async () => {

            const user = {
                idUser: uuid(),
                login: name,
                password,
                decentraliz: 1
            }
            console.log('infomation usre', user)
            const { data: { addNewUser } } = await addUser(user)
            if (addNewUser && addNewUser.idUser) {
                toast.success("Register success !!");
            }
            else {
                toast.error("Register error !");
            }
        }}>Register</UIButton>
        <button onClick={() => {
            toast.success('csackasjnckcsac')
        }}>casasca</button>
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