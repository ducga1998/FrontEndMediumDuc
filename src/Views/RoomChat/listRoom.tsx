import * as React from 'react';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';

import { roomSockets } from '../../socketClient/socket';
import UIInput from '../../Components/UI/UIInput';
import UIButton from '../../Components/UI/UIButton';
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
        // this event emmiter add room to backend
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
            <UIButton onMouseDown={this.handleOnClick}> Submit </UIButton>
            <$Wrapper>

                <SubscribeOne to={roomContainer} bind={['rooms', 'roomsToIdUser']}>
                    {
                        container => {
                            const { rooms, roomsToIdUser } = container.state
                            return <> <TheWord>
                                <h1>The Word chanel</h1>
                                {rooms.reverse().map((item, key) => <div key={key}>

                                    <Link to={`/chatRoom/${item.idRoom}`}><h3><b>Room {key} : </b> {item.title}</h3></Link>
                                </div>)}
                            </TheWord>
                                <Person>
                                    <h1>Your chanel</h1>
                                    {roomsToIdUser.reverse().map((item, key) => <div key={key} >

                                        <Link to={`/chatRoom/${item.idRoom}`}><h3> <b>Room {key} : </b>{item.title}</h3></Link>
                                    </div>)}
                                </Person>
                            </>
                        }
                    }
                </SubscribeOne>
            </$Wrapper>
        </div>
    }
}
const Person = styled.div`
    flex : 6;
    height : 600px;
    overflow : scroll;
    border : 3px solid black;
    padding : 10px;
    background-color : #f0ece8;
`
const TheWord = styled.div`
    flex : 6;
    height : 600px;
    overflow : scroll;
    border : 3px solid black;
    padding : 10px;
    background-color : #f2faf9
`
const $Wrapper = styled.div`
    display : flex;
    flex-direction : row;
    border : 3px solid black;
`