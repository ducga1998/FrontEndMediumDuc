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
import { getAllRoomFromBackEnd } from '../../API/roomAPI';
import roomContainer from '../../Container/roomContainer';
import { SubscribeOne } from 'unstated-x';

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
    async componentDidMount() {
        // console.log(roomContainer.state)
        roomSockets.on('updateListRooms', data => {
            const { arr } = this.state
            arr.push(data)
            this.setState({ arr })
        })
        const data = await roomContainer.getRoomByIdUser()
        const allRoom = await getAllRoomFromBackEnd() as any
        console.log(allRoom.data)
        // this.setState()
    }
    render() {
        const { title, arr } = this.state
        return <div>
            <h1>Create Room</h1>
            <UIInput onChange={this.handleOnChange} value={title} />
            <UIButton onChange={this.handleOnClick}> Submit </UIButton>
            <$Wrapper>
                <SubscribeOne to={roomContainer} bind={['rooms']}>
                    {
                        container => {
                            const { rooms } = container.state
                            return <div>
                                {rooms.map(item => <div>
                                    <Link to={`/chatRoom/${item.idRoom}`}><h3>{item.title}</h3></Link>
                                </div>)}
                            </div>
                        }
                    }
                </SubscribeOne>
            </$Wrapper>
        </div>
    }
}


