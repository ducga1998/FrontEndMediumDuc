
import * as React from 'react';
import styled from 'styled-components';

import { messageChatSocket } from '../../socketClient/socket';
import UIInput from '../../Components/UI/UIInput';
import UIButton from '../../Components/UI/UIButton';;
import { fontStack } from '../../Components/styled/base';
import { toast } from 'react-toastify';
import { getAllInformationUser } from 'src/API/client';
import { getAllMessageByIdUserReceive } from 'src/API/messageAPI';
import uuid from 'uuid'
import userContainer from '../../Container/userContainer';
import { createRoom, getRoomById } from '../../API/roomAPI';

interface IListRoom {
    match?: any
}
const listInfoUser = [
    {
        idUserReceive: "A",
        nameUserReceive: "duc",
        time: "now",
        newMessage: "ok roi nha",
        idRoom  : "AfA"
    },
    {
        idUserReceive: "B",
        nameUserReceive: "duc",
        time: "now",
        newMessage: "ok roi nha",
        idRoom  : "A2A"
    },
    {
        idUserReceive: "C",
        nameUserReveice: "duc",
        time: "now",
        newMessage: "ok roi nha",
        idRoom  : "A3A"
    },
    {
        idUserReceive: "D",
        nameUserReceive: "duc",
        time: "now",
        newMessage: "ok roi nha",
        idRoom  : "AAr"
    },
    {
        idUserReceive: "E",
        nameUserReceive: "duc",
        time: "now",
        newMessage: "ok roi nha",
        idRoom  : "AAe"
    },
    {
        idUserReceive: "F",
        nameUserReceive: "duc",
        time: "now",
        newMessage: "ok roi nha",
        idRoom  : "AAr"
    }
]
//save tat ca tin nhan nha 
// cai nao load truoc thi load

export default class ChatMessage extends React.Component<IListRoom> {
    state = {
        title: '',
        active: '',
        messages: [],
        valueChat: '',
        newUserChat: {},
        rooms: listInfoUser,
        selectingRoom : null,
        firstSend : false,
        isOwner : true
    }
    socket
    refViewChat: any = React.createRef()
    async componentDidMount() {
        const { match: { params: { id ,  name} } } = this.props ; 
        const rooms =  await getRoomById()  as any [] ;// all room for we  =))  
        const flag2 =  rooms.filter(item => item.idUser === id); // client
        const flag =  rooms.filter(item => item.idUserReceive === id); // owner room 
        console.log('flag',flag)
        if(flag2.length === 0){
            console.log('it " s owner rooom')
            this.setState({isOwner : false })
        }
        // create room if no room eexi
        if (id !== 'no' && flag.length === 0 && flag2.length === 0) {
          const infoNewRoom =  await createRoom(
                {
                    idRoom : uuid(),
                    idUserReceive : id, 
                }
            )
            rooms.push(infoNewRoom)
            this.setState({  rooms  })
        }
        console.log('rooms',rooms)
        this.setState({rooms})
        this.socket = new SocketMessageChat()
        this.socket.on('receviceMessage', data => {
           console.log('recevice message   ' , data)
            this.sendMessage(data, true)
        })
    
    }
    selecteUserChat = async (room ) => {
        const { scrollHeight } = this.refViewChat
        setTimeout( () => {
            this.refViewChat.scrollTo({
                top: scrollHeight, behavior: 'smooth'
            });
        } , 1500)
        console.log('room  ' , room)
        // info in room include : tin nhan cuoi cung , ten ng nhan va gui 
        const { idRoom , messages } = room
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
        console.log('all message room' , messages)
        if(messages && messages.length  === 0){
            this.setState({firstSend : true})
        }

        this.setState({  messages : messages?messages : [] , active : idRoom  ,  selectingRoom : room }, () => {
            this.socket.join(idRoom)
        })
    }
   
    // tao idComm khi user chat lan dau => 
    sendMessage = (dataMess, stateSend = false) => {
        const {contentMessage , idUser , idUserReceive} = dataMess
        const { match: { params: {    name} } } = this.props ; 
        const { messages  } = this.state
        if (contentMessage === '') {
            toast.error("Please, not empty, fill out input : )")
            return
        }
        const { scrollHeight } = this.refViewChat
        const  idUserCurrent = userContainer.state.dataUser.idUser
        const isOwner = idUserCurrent === idUser ? true : false
        // isOwner => A send B => idUser : A , idUserReceive : B
        // not isOwner => B -> send A => idUser : B => idUserReceice : A
        // handle socket send message 
        // bug if we after : idUser + idUserReceive   ma co 2 idRoom
        const idFinal = isOwner ?idUserReceive : idUser;
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
       
     
        console.log('dataMess', dataMess )
       
        // console.log('idFinal',idFinal)
        this.socket.send('sendMessage', dataMess)
      
    }
    handleFocus = () => {
        this.socket.send('loading')
    }
    render() {
        const idUserCurrent  = userContainer.state.dataUser.idUser
        const { active, messages, valueChat, rooms  , selectingRoom} = this.state as any
        return <$Wrapper>
            <PeasonList>
                {
                    rooms.map((room, key) => {
                        const {idRoom} = room
                        return <div key={key} className={`item_Message ${idRoom === active ? "active" : ''}`}
                        onClick={
                            () => {
                                this.selecteUserChat(room )
                            }
                        }>
                        <h2 className="name_people">
                            {room.nameUserReveice}
                        </h2>
                        <div className="time_message">
                            {room.time}
                        </div>
                        <div className="new_message">
                            {room.newMessage}
                        </div>
                    </div>
                    }
                    )
                }
            </PeasonList>
            <ChatZone>
            {selectingRoom && <>  
                <div className="title_chatZone">
                    <h1>Davil Nguyen</h1>
                </div>
                    <div className="view_chat" ref={(e) => this.refViewChat = e} >
                        {
                           messages &&  messages.map((message, key) => {
                               const idOwnrRoom= selectingRoom.idUser
                               const { contentMessage,  idUserReceive , idUser ,stateSend } = message as any
                            const isOwner =  idOwnrRoom === idUser? true :false
                           
                            // const flag = idUserCurrent ===  idUserReceive ?
                            const idUserMessage = message['idUser']
                            return <div data-tooltip={idUser} className={`item_chat ${(stateSend || idUserCurrent !== idUser)? "friend" : "me"} `} key={key}>
                                <div className="item_chat_value">{contentMessage}</div>
                            </div>

                        })}
                    </div>
                    <div className="input_chat" >
                        <UIInput
                            onChange={(valueChat) => { this.setState({ valueChat }) }}
                            onKeyPress={
                                (event) => {
                                    if (event.charCode === 13) {
                                        const contentMessage = event.target.value
                                        const { idUserReceive , idRoom, idUser} = selectingRoom as any
                                        this.sendMessage({
                                            contentMessage,
                                            idUserReceive , // client
                                            idRoom,
                                            idUser // owner
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
                    </>
                }
            </ChatZone>
        </$Wrapper>
    }
}



const ChatZone = styled.div`
    flex : 9;
    height : 100%;
    overflow : scroll;
    padding : 10px;
    display : flex;
    flex-direction : column;
    .title_chatZone {
        border-bottom :1px solid gray;
    }
    .view_chat {
        display : flex;
        overflow : scroll;
        height : 100%;
        flex-direction : column;
        .item_chat {
            margin : 10px;
        }
        .item_chat_value{
            padding: 10px 20px;
            background: #00aaff;
            color: white;
            display: inline-block;
            border-radius: 21px;
            font-size : 24px;
        }
        .friend {
            text-align : left;
            margin-left : 100px;
        }
        .me {
            text-align : right;
            margin-right :100px;
            .item_chat_value {
                background : #d0d2d3;
            }
        }
    }
    .input_chat{
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
   background : white;
    .item_Message {
        transition : .1s;
        padding : 30px;
        border-bottom : 1px solid black;
        background-color :#f4f7f9;
        cursor : pointer;
        &:hover {
            background: #eff3f6;
            .name_people{
                
            }
        }
        .name_people{
            color : gray;
        }
        .time_message{
            color : black;
        }
        .new_message{

        }
        &.active {
            background : #ced7df;
            &:hover {
                background : #bbc2c9
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
class SocketMessageChat {
    socket = messageChatSocket
    constructor() {
        // this.socket = messageChatSocket as any
        this.socket.on('connection', () => {
            console.log('connection socket')
        })
    }
    send(nameEvent = "sendMessage", data) {

        this.socket.emit(nameEvent, data)
    }
    on(eventName, callback) {
        this.socket.on(eventName, callback)
    }
    join(idUser) {
        console.log('okk', idUser)
        this.socket.emit('join', idUser)
    }

    leave(idUser) {
        this.socket.emit('leave', idUser)
    }


}