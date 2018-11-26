import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../UI/UILoading';
import Article from '../Article';
import { chatsockets, roomSockets } from '../../socketClient/socket';
import ListRoom from './listRoom';
import UIButton from '../../UI/UIButton';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

interface IRoomChat {
    match: any
}
export default class RoomChat extends React.Component<IRoomChat> {
    state = {
        value: ''
    }
    refWrappInput: any = React.createRef()
    componentDidMount() {
        const { match: { params: { id } } } = this.props
        const input = {
            idUser: userContainer.state.dataUser.idUser,
            idRoom: id
        }
        chatsockets.on('connect', function () {

        })
        chatsockets.emit('join', input)

        chatsockets.on('addMessage', (data: string) => {
            // chatsockets.emit('join', input)

            console.log('log to server socket', data)
            const NewDom = document.createElement('div')
            NewDom.style.backgroundColor = "black";
            NewDom.style.color = "white"
            NewDom.style.padding = "20px"
            NewDom.style.marginTop = "2px"
            NewDom.style.transition = ".3s"
            NewDom.innerHTML = data
            toast.success(data)
            // console.log('marign padding, adding curent')
            this.refWrappInput.current.appendChild(NewDom)
        })
        chatsockets.on('loadindKeyBoadUser', name => {
            this.setState({ loading: true, name })
        })
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
    }
    handleFocus = () => {
        chatsockets.emit('userFocus', userContainer.state.dataUser.name)
    }
    render() {

        return <$WrapperChat>
            <$ViewChat ref={this.refWrappInput} />
            <$WrapperInput >

                <$InputChat onFocus={this.handleFocus} onChange={this.handleOnChange} onKeyPress={this.handleKeyUp} />
                <UIButton onChange={this.handleOnClick}> Send  </UIButton>
            </$WrapperInput>

        </$WrapperChat>
    }
}

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
        background-color: #e8e7e7;
    width: 100%;
    height: 100%;
    overflow : scroll;
`
const $WrapperInput = styled.div`
    display : flex;
    flex-direction : row;
`
const $InputChat = styled.input`
    width : 100%;

`