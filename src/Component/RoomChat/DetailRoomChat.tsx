import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../UI/UILoading';
import Article from '../Article';
import { socket } from '../../help/help';
import ListRoom from './listRoom';
import UIButton from '../../UI/UIButton';

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
        const { value } = this.state
        // note ;  on is function await call, and emit is call function

        socket.on('chat2', (data) => {
            const dom = this.refWrappInput.current
            const A = document.createElement('div')
            A.innerHTML = data
            dom.appendChild(A)
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
        const { value } = this.state
        socket.emit('chat', value)
    }
    render() {
        return <$WrapperChat>
            <$ViewChat ref={this.refWrappInput} />
            <$WrapperInput >

                <$InputChat onChange={this.handleOnChange} onKeyPressCapture={this.handleKeyUp} />
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
`
const $WrapperInput = styled.div`
    display : flex;
    flex-direction : row;
`
const $InputChat = styled.input`
    width : 100%;

`