import * as React from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import { addUser } from '../../API/client';
import UIButton from '../../Components/UI/UIButton';
import UIField from '../../Components/UI/UIField';
const { useState, useEffect } = React
export default function Register() {
    const [login, setValueLogin] = useState('')
    const [password, setValuePassword] = useState('')
    const [name, setValueName] = useState('')
    const [avatarLink, setValueAvatarLink] = useState('')
    const [isRegister, setRegister] = useState(false)
    return <$Form>
        <h2 className="center">Register</h2>
        <UIField  titleField="Email and Name" placeholder="Email ..." value={login} onChange={(value) => { setValueLogin(value) }} />
        <UIField  type="password" titleField="Password" placeholder="Password .... " value={password} onChange={(value) => {
            setValuePassword(value)
        }} />
        <UIField minLength={6} type="text" titleField="Name Your... " placeholder="Name Your... " value={name} onChange={(value) => {
            setValueName(value)
        }} />
        <UIField type="text" titleField="Link avatar" placeholder="Link avatar .... " value={avatarLink} onChange={(value) => {
            setValueAvatarLink(value)
        }} />

        <UIButton onMouseDown={async () => {

            const user = {
                idUser: uuid(),
                login,
                password,
                decentraliz: 1,
                name,
                avatarLink
            }
            const newUser = await addUser(user)
            if (name.length > 6 && password.length > 6 && newUser && newUser.idUser) {
                toast.success("Register success !!");
            }
            else {
                toast.error("Register error !");
            }
        }}>Register</UIButton>
        <UIButton> <Link to='/login'> Back </Link> </UIButton>
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