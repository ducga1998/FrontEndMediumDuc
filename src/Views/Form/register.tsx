import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import uuid from 'uuid/v1';
import { addUser } from '../../API/client';
import UIButton from '../../Components/UI/UIButton';
import UIField from '../../Components/UI/UIField';
// import Link from '../../Components/Link';
import { H3, H1 } from 'src/Components/styled/base';
import { AvatarImage } from 'src/Components/styled/avatar';
import { Section } from '../../Components/styled/nav';
// import { StyledOutlineButton } from '../../Components/styled/button';
const { useState } = React
export default function Register() {
    const [login, setValueLogin] = useState('')
    const [password, setValuePassword] = useState('')
    const [name, setValueName] = useState('')
    const [avatarLink, setValueAvatarLink] = useState('')
    const [isRegister, setRegister] = useState(false)
    async function handleRegister() {
        const user = {
            idUser: uuid(),
            login,
            password,
            name,
            avatarLink
        }
        if (name.length > 6 && password.length > 6 ) {
            toast.success("Register success !!");
            await addUser(user) as any
        }
        else {
            toast.error("Register error !");
        }

    }

    return <$Form>
        <div className="center">
            <AvatarImage size={300} src="./default.jpg" data-tooltip="Đăng ký vào form đi ae eiiiii =))))))))))" />
        </div>
        <H1 className="center">Register</H1>
        <UIField titleField="Email and Name" placeholder="Email ..." value={login} onChange={(value) => { setValueLogin(value) }} />
        <UIField type="password" titleField="Password" placeholder="Password .... " value={password} onChange={(value) => {
            setValuePassword(value)
        }} />
        <UIField minLength={6} type="text" titleField="Name Your... " placeholder="Name Your... " value={name} onChange={(value) => {
            setValueName(value)
        }} />
        <UIField type="text" titleField="Link avatar" placeholder="Link avatar .... " value={avatarLink} onChange={(value) => {
            setValueAvatarLink(value)
        }} />

        <Section>
            <UIButton onMouseDown={handleRegister} > Register </UIButton> 
            <UIButton to='/login'> Back </UIButton> 
        </Section>
    </$Form>
}   
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