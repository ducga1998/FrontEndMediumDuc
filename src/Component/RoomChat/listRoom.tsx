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

interface IListRoom {
    match: any
}
export default class ListRoom extends React.Component<IListRoom> {
    state = {
        value: ''
    }
    handleOnChange = (e: any) => {
        const { value } = e.target
        this.setState({ value })
    }
    handleOnClick = (e: any) => {
        socket.emit('chat', 'dmmm console di em ei')
    }
    render() {
        const { value } = this.state
        return <div>
            <input onChange={this.handleOnChange} value={value} />
            <button onClick={this.handleOnClick}> Submit </button>
        </div>
    }
}
const $Input = styled.input`
    padding :20px;
    width
    &:focus {
        outline : none;
        background-color : gray;
        color : black;
    }
`
