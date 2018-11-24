import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../UI/UILoading';
import Article from '../Article';
import { roomSockets } from '../../socketClient/socket';
import UIInput from '../../UI/UIInput';
import UIButton from '../../UI/UIButton';
import { Link } from 'react-router-dom';

interface IListRoom {
    match?: any
}
export default class ListRoom extends React.Component<IListRoom> {
    state = {
        title: '',
        arr: ["1"]
    }
    handleOnChange = (title: string) => {
        this.setState({ title })
    }
    handleOnClick = (e: any) => {
        const { title } = this.state
        const { idUser } = userContainer.state.dataUser
        roomSockets.emit('addRoom', { title, idUser })
    }
    componentDidMount() {

        roomSockets.on('updateListRooms', data => {
            const { arr } = this.state
            arr.push(data)
            this.setState({ arr })
        })
    }
    render() {
        const { title, arr } = this.state

        return <div>
            <h1>Create Room</h1>
            <UIInput onChange={this.handleOnChange} value={title} />
            <UIButton onChange={this.handleOnClick}> Submit </UIButton>
            <div>{arr.map((item: any, key) => <Link to={`/chatRoom/${item.idRoom}`}>{item.title} <br /> {item.idUser}</Link>)}</div>
        </div>
    }
}
const $Input = styled.input`
    padding :20px;
    width
    &   :focus {
        outline : none;
        background-color : gray;
        color : black;
    }
`
