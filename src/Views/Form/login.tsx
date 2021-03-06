
import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import userContainer from '../../Container/userContainer';
import UIButton from 'Components/UI/UIButton';

import { Section } from 'Components/styled/nav';
import { Label } from 'Components/styled/button';
import UIInput from 'Components/UI/UIInput';
import { FlexCol, P, H3, H2, H1 } from 'Components/styled/base';
import { AvatarImage } from 'Components/styled/avatar';
import { redirect } from '../../route';

const { useState, useEffect, useRef } = React
function CheckUser(user, password) {
    if (user === 'admin' && password === 'admin') {
        console.log('ok')
        return true
    }
    return false
}
const MESSAGETOOLTIP = "nhìn tao thì quay ngược màn hình lại thử xem =))))"
export default function Login({ history }) {
    const [name, setValueName] = useState('')
    const [password, setValuePassword] = useState('')
    async function handleLogin(e) {
        const dataUser = await userContainer.login({ username: name, password })
        if (!dataUser) {
            toast.error('Login false, please check user name and passwod')
        }
        else {
            location.pathname = '/home'            // history.push('/home')
        }

    }
    useEffect(() => {
        const { login } = userContainer.state
        console.log('lgoin', login)
        if (login) {
            history.push('/home')
        }
    }, [])


    return <$Form>  <div className="center">
        <AvatarImage style={{ transform: 'rotate(180deg)' }} size={300} src="./default.jpg" data-tooltip={MESSAGETOOLTIP} />
    </div>
        <H1 className="center">Login</H1>
        <Field>
            <H2>Login : </H2>
            <UIInput onChange={(value) => { setValueName(value) }} placeholder="Email ..." value={name} />
        </Field>
        <Field>
            <H2>Password : </H2>
            <UIInput type="password" placeholder="Password .... " value={password} onChange={(value) => {
                setValuePassword(value)
            }} />
        </Field>
        <Section>
            <UIButton onMouseDown={handleLogin}>Login</UIButton>
            <UIButton to='/register' >Register</UIButton>
        </Section>
        <Social>
            <UIButton>Facebook</UIButton>
            <UIButton icon="github" style={{ backgroundColor: 'black' }}>Github</UIButton>
        </Social>
    </$Form>
}
const Social = styled.div`
    display : flex;
    
    a {
    
    }
    .facebook{

    }
    .github {
        
    }
`
const $Form = styled.div`
    width : 500px;
    margin : auto;
    .center {
        text-align : center;
    }
    text-transform: uppercase;
    font-size: 3em;
    width: 500px;
    margin: auto;
    padding: 40px;
    background-color: ${props => props.theme.bg.inactive};
    border-radius: 14px;
    
`
const Field = styled(FlexCol)`
align-self: flex-start;
margin : 10px 0px;
`