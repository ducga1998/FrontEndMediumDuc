import * as React from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import userContainer from '../../Container/userContainer';
import UIButton from '../../UI/UIButton';
import UIField from '../../UI/UIField';

const { useState, useEffect, useRef } = React
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
                toast.error('Login false, please check user name and passwod')
            }
            else {
                history.push('/home')
            }

            console.log(dataUser)
        }}>Login</UIButton>
        <UIButton  ><Link to='/register'>Register</Link></UIButton>
    </$Form>
}
const $Form = styled.div`
    width : 500px;
    margin : auto;
    .center {
        text-align : center;
        font-family: 'Ubuntu', sans-serif;
    color: #00b5ad;
    text-transform: uppercase;
    font-size: 3em;
    }
`