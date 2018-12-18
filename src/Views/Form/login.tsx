import * as React from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import userContainer from '../../Container/userContainer';
import UIButton from '../../Components/UI/UIButton';

import { Section } from '../../Components/styled/nav';
import { Label } from '../../Components/styled/button';
import UIInput from '../../Components/UI/UIInput';
import { Field } from '../../Components/styled/layout';

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
    async function handleLogin(e) {
        const dataUser = await userContainer.login({ username: name, password })
        if (!dataUser) {
            toast.error('Login false, please check user name and passwod')
        }
        else {
            history.push('/home')
        }

    }
    return <$Form>
        <h2 className="center">Login Accout</h2>
        <Field>
            <Label>Login : </Label>
            <UIInput onChange={(value) => { setValueName(value) }} placeholder="Email ..." value={name} />
        </Field>
        <Field>
            <Label>Password : </Label>
            <UIInput type="password" placeholder="Password .... " value={password} onChange={(value) => {
                setValuePassword(value)
            }} />  </Field>
        <Section>
            <UIButton onMouseDown={handleLogin}>Login</UIButton>
            <UIButton  ><Link to='/register'>Register</Link></UIButton>
        </Section>
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