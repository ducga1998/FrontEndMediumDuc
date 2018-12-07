import * as React from 'react';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

import userContainer from '../../Container/userContainer';

import { chatsockets, roomSockets } from '../../socketClient/socket';

import UIButton from '../../UI/UIButton';

import { getMessageByIdRoom } from '../../API/messageAPI';

interface IRoomChat {
    match: any
}
export default class RoomChat extends React.Component<IRoomChat> {
    state = {
        value: ''
    }
    refUserCurrent: any = React.createRef()
    refOtherUser: any = React.createRef()
    async  componentDidMount() {

        const { match: { params: { id } } } = this.props
        const input = {
            idUser: userContainer.state.dataUser.idUser,
            idRoom: id
        }
        const dataMessage = await getMessageByIdRoom(id)
        console.log('dataMessage', dataMessage)
        chatsockets.on('connect', function () {

        })
        chatsockets.emit('join', input)

        chatsockets.on('addMessage', (content: string) => {
            // chatsockets.emit('join', input)

            console.log('log to server socket', content)
            this.addMessageOtheruser(content)
            // console.log('marign padding, adding curent')
            // this.refWrappInput.current.appendChild(NewDom)
        })
        chatsockets.on('loadindKeyBoadUser', name => {
            this.setState({ loading: true, name })
        })
    }
    addMessageOtheruser(content) {
        const messageDom = document.createElement('div')
        const dom = document.createElement('div')
        this.refUserCurrent.current.appendChild(dom)
        messageDom.className = "messageOtherUser"
        // messageDom.className = ""

        messageDom.innerHTML = content

        this.refOtherUser.current.appendChild(messageDom)
    }
    addMessageThisUser(data) {
        const messageDom = document.createElement('div')
        messageDom.className = "messageToMe"
        const dom = document.createElement('div')
        this.refOtherUser.current.appendChild(dom)
        messageDom.innerHTML = data.content
        this.refUserCurrent.current.appendChild(messageDom)
    }
    handleOnChange = (e: any) => {
        const { value } = e.target
        this.setState({ value })
    }
    handleKeyUp = (e) => {
        console.log(e)
    }
    handleOnClick = (e: any) => {
        const { match: { params: { id } } } = this.props
        const { value } = this.state
        const input = {
            content: value,
            idUser: userContainer.state.dataUser.idUser,
        }

        chatsockets.emit('newMessage', id, input)
        this.addMessageThisUser(input)
    }
    handleFocus = () => {
        chatsockets.emit('userFocus', userContainer.state.dataUser.name)
    }
    render() {
        return <$WrapperChat>
            <$ViewChat>
                <$ViewChatUserCurrent ref={this.refUserCurrent} />
                <$ViewChatOtherUser ref={this.refOtherUser} />
            </$ViewChat>
            <$WrapperInput >
                <$InputChat onFocus={this.handleFocus} onChange={this.handleOnChange} onKeyPress={this.handleKeyUp} />
                <UIButton onMouseDown={this.handleOnClick}> Send  </UIButton>
            </$WrapperInput>
        </$WrapperChat>
    }
}
const $ViewChatUserCurrent = styled.div`
 div {
    margin-top : 10px;
}
    .messageToMe {
        background-color: #c0d7dd;
    }
    flex : 6;
`
const $ViewChatOtherUser = styled.div`
    div {
        margin-top : 10px;
    }
    .messageOtherUser {
        margin-top : 10px;
        background-color: #dcdcea;
    }
    flex : 6;
`
const $WrapperChat = styled.div`
    border : 2px solid black;
    display : flex;
    width : 100%;
    flex-direction: column;
    height : 700px;
    background-color : #f0eeee;
    justify-content: flex-end;  
`
const $ViewChat = styled.div`
    /* display : flex;
    /* flex-direction: column; */
    display : flex;
    background-color: #e8e7e7;
    width: 100%;
    height: 100%;
    overflow : scroll;
       div {
        padding: 30px;
        font-size: 22px;
        height : 40px;
        border-radius: 40px;
    }
`
const $WrapperInput = styled.div`
    display : flex;
    flex-direction : row;
`
const $InputChat = styled.input`
    width : 100%;

`