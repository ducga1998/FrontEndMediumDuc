
import * as React from 'react';
import styled from 'styled-components';
import UIInput from '../../Components/UI/UIInput';
import UIButton from '../../Components/UI/UIButton';;
import { fontStack } from '../../Components/styled/base';
import { toast } from 'react-toastify';
import uuid from 'uuid'
import userContainer from '../../Container/userContainer';
import { createRoom, getRoomById } from '../../API/roomAPI';
import SocketMessageChat from 'src/socketClient/messageChatSocket';
import { getAllMessageByIdUserReceive } from '../../API/messageAPI';
import { AvatarImage } from '../../Components/styled/avatar';
import UIModal from '../../Components/UI/UIModal';

interface IListRoom {
    match: {
        params  :  {
            id : string
        }
    }
}
interface IMessages {
    idUserReceive :string
    idUser :string
    contentMessage :string
}
export interface IRoom {
    idUser :string
    idRoom :string
    idUserReceive :string
    messages : IMessages
    ownerUserInfo :any
    clientInfo : any
}
export default class ChatMessage extends React.Component<IListRoom> {
    state = {
        active: '',
        messages: [],
        valueChat: '',
        rooms: [],
        selectingRoom: null,
        open  : false
    }
    socket
    refViewChat: any = React.createRef()
    async componentDidMount() {
        const { match: { params: { id } } } = this.props;
        const rooms = await getRoomById()  ;// all room for we  =))  
        const flag2 = rooms.filter(item => item.idUser === id); // client
        const flag = rooms.filter(item => item.idUserReceive === id); // owner room 
        // create room if no room eexi
        if (id !== 'no' && flag.length === 0 && flag2.length === 0) {
            const infoNewRoom = await createRoom(
                {
                    idRoom: uuid(),
                    idUserReceive: id,
                }
            )
            rooms.push(infoNewRoom)
            this.setState({ rooms })
        }
        this.setState({ rooms })
        this.socket = new SocketMessageChat()
        this.socket.on('receviceMessage', data => {
            this.sendMessage(data, true)
        })

    }
    selecteUserChat = async (room) => {
        const { scrollHeight } = this.refViewChat
        // info in room include : tin nhan cuoi cung , ten ng nhan va gui 
        const { idRoom } = room
        const messages = await getAllMessageByIdUserReceive(idRoom)
        console.log('messages', messages, idRoom)
        const { selectingRoom } = this.state
        // disconnect user old, if not select user else not leave
        if (!selectingRoom) {
            this.socket.leave(idRoom)
        }

        // query as idRoom 
        /*
            1 : thay doi thong tin room dang chon
            2 : thay doi toan bo tin nhan vi da chon room khac
            3 : thay cong socket 
        */
        this.setState({ messages: messages ? messages : [], active: idRoom, selectingRoom: room }, () => {
            this.socket.join(idRoom)
        })
    }

    // tao idComm khi user chat lan dau => 
    sendMessage = (dataMess, stateSend = false) => {
        const { contentMessage, idUser, idUserReceive } = dataMess
        const { messages } = this.state
        if (contentMessage === '') {
            toast.error("Please, not empty, fill out input : )")
            return
        }
        const { scrollHeight } = this.refViewChat
        const idUserCurrent = userContainer.state.dataUser.idUser
        const isOwner = idUserCurrent === idUser ? true : false
        // isOwner => A send B => idUser : A , idUserReceive : B
        // not isOwner => B -> send A => idUser : B => idUserReceice : A
        // handle socket send message 
        // bug if we after : idUser + idUserReceive   ma co 2 idRoom
        const idFinal = isOwner ? idUserReceive : idUser;
        dataMess.idUserReceive = idFinal
        dataMess.idUser = idUserCurrent
        dataMess.stateSend = stateSend
        // const finalData = ({...dataMess , ...{idUserReceive  : idFinal, idUser : idUserCurrent });

        this.setState({ messages: [...messages, ...[dataMess]], valueChat: '' }, () => {
            this.refViewChat.scrollTo({
                top: scrollHeight, behavior: 'smooth'
            });

        })
        if (stateSend) return
        this.socket.send('sendMessage', dataMess)

    }
    handleFocus = () => {
        this.socket.send('loading')
    }
    detectAndGetDataUserClient = () => {
        return 
    }
    render() {
        const idUserCurrent = userContainer.state.dataUser.idUser
        const { active, messages, valueChat, rooms, selectingRoom , open } = this.state as any
        return <$Wrapper>
            <PeasonList>
                {
                    rooms.map((room, key) => {
                        const { idRoom , ownerUserInfo , clientInfo } = room
                        const {idUser}  = ownerUserInfo;
                        
                        const {name , avatarLink}  =  idUser ===  idUserCurrent? ownerUserInfo: clientInfo
                        return <div key={key} className={`md-item_Message ${idRoom === active ? "active" : ''}`}
                            onClick={
                                () => {
                                    this.selecteUserChat(room)
                                }
                            }>
                            <AvatarImage size={50} src={avatarLink}/>
                            <h2 className="md-name_people">
                                {name}
                            </h2>
                            <div className="md-time_message">
                                {room.time}
                            </div>
                            <div className="md-new_message">
                                {room.newMessage}
                            </div>
                        </div>
                    }
                    )
                }
            </PeasonList>
            <ChatZone>
                {selectingRoom ? <>
                    <div className="md-title_chatZone">
                        <h1>{selectingRoom.ownerUserInfo.idUser === idUserCurrent?selectingRoom.ownerUserInfo.name:
                                    selectingRoom.clientInfo.name}</h1>
                    </div>
                    <div className="md-view_chat" ref={(e) => this.refViewChat = e} >
                        {
                            messages && messages.map((message, key) => {
                                const { contentMessage, idUser, stateSend, ownerUserInfo: { name, avatarLink } } = message as any
                                return <div className={`md-item_chat md-${(stateSend || idUserCurrent !== idUser) ? "friend" : "me"} `} key={key}>
                                    <div className={`md-item_chat_wrapper md-${stateSend || idUserCurrent !== idUser ? "friend" : "me"}`}>
                                        <AvatarImage size={40} src={avatarLink} data-tooltip={name} />
                                        <div className="md-item_chat_value"  >{contentMessage}</div>
                                    </div>
                                </div>

                            })}
                    </div>
                    <div className="md-input_chat" >
                        <UIInput
                        autoFocus
                            onChange={(valueChat) => { this.setState({ valueChat }) }}
                            onKeyPress={
                                (event) => {
                                    if (event.charCode === 13) {
                                        const contentMessage = event.target.value
                                        const { idUserReceive, idRoom, idUser ,ownerUserInfo } = selectingRoom as any
                                        this.sendMessage({
                                            contentMessage,
                                            idUserReceive, // client
                                            idRoom,
                                            idUser , // owner
                                            ownerUserInfo
                                        })
                                    }
                                }
                            }
                            onFocus={this.handleFocus}
                            value={valueChat} />
                        <UIButton
                        // onMouseDown={() => { this.sendMessage({ contentMessage: valueChat, role: 1, idRoom }) }}
                        >
                            Send

                    </UIButton>
                    </div>
                </> : <Placeholder>
                   <UIModal 
                    openModal={() => {this.setState({open : true})}}
                    open ={open}
                    closeMoDal={() => {this.setState({open : false})}} 
                    trigger={<img src="/default2.png" />} 
                    onClickOutSide={() => {this.setState({open : false})}}
                   >
                   
                   <img src="/hello.png" />
                   </UIModal>
                </Placeholder>
                }
            </ChatZone>
        </$Wrapper>
    }
}
const Placeholder = styled.div`
    display : flex;
    justify-content : center;
    img {
        cursor : pointer;
    }
`
const ChatZone = styled.div`
    flex : 9;
    height : 100%;
    overflow : scroll;
    padding : 10px;
    display : flex;
    flex-direction : column;
    .md-title_chatZone {
        border-bottom :1px solid #dbdbdb;
        padding-left : 10px;
    }
    .md-view_chat {
        display : flex;
        overflow : scroll;
        height : 100%;
        background : #f7f7f7;
        flex-direction : column;
        .md-item_chat {
            margin : 10px;
        
        .md-item_chat_wrapper{
            align-items: center;
            display : flex;
          
        }
        .md-item_chat_value {
                padding: 10px 20px;
                background: #00aaff;
                color: white;
                display: inline-block;
                border-radius: 21px;
                font-size : 24px;
        }
        .md-friend {
            margin-left : 100px;
        }
        .md-me {
            flex-direction: row-reverse;
            margin-right :100px;
            .md-item_chat_value {
                background : #d0d2d3;
            }
        }
        }
    }
    .md-input_chat{
        display : flex;
        padding : 10px;
        bottom: 0px;
        border-top: 5px solid #dbdbdb;
        background: #dbdbdb;
        border-radius: 17px;
        input {
         width : 80%;
        }
        button {
           
        }
    }
`

const PeasonList = styled.div`
    flex : 3;
    /* height : 600px; */
    height : 100%;
    overflow : scroll;
    background : ${props => props.theme.bg.default};    
    border-right : 1px solid #d2d2d2;
    .md-item_Message {
        display : flex;
        transition : .1s;
        padding : 20px;
        border-bottom :1px solid #d2d2d2;
        background-color :#efefef;
        cursor : pointer;
        &:hover {
            background: #eff3f6;
            .md-name_people{
                
            }
        }
        .md-name_people{
            color : #1A051D;
        }
        .md-time_message{
            color : #1A051D;
        }
        .md-new_message{

        }
        &.active {
            background : #efefef;
            &:hover {
                background : #e8e8e8
            }
        }
    }
`
const $Wrapper = styled.div`
    display : flex;
    flex-direction : row;
    background : white;
    width : 100%;
    height : 100%;
    ${fontStack}
`
