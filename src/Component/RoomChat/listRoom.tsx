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
import UIInput from '../../UI/UIInput';
import UIButton from '../../UI/UIButton';

interface IListRoom {
    match?: any
}
export default class ListRoom extends React.Component<IListRoom> {
    state = {
        value: '',
        arr: ["1"]
    }
    handleOnChange = (value: string) => {
        this.setState({ value })
    }
    handleOnClick = (e: any) => {

        socket.emit('addRoom', 'addRoomText')
    }
    componentDidMount() {
        socket.on('eventAddRoom', data => {
            const { arr } = this.state
            arr.push("111")
            this.setState({ arr })
        })
    }
    render() {
        const { value, arr } = this.state

        return <div>
            <UIInput onChange={this.handleOnChange} value={value} />
            <UIButton onChange={this.handleOnClick}> Submit </UIButton>
            <div>{arr.map(item => <div>Socket no de ra</div>)}</div>
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
