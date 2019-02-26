
import * as React from 'react';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

import { messageChatSocket } from '../../socketClient/socket';
import UIInput from '../../Components/UI/UIInput';
import UIButton from '../../Components/UI/UIButton';;
import { fontStack } from '../../Components/styled/base';
import { toast } from 'react-toastify';

interface IListRoom {
    match?: any
}
const listInfoUser = [
    {
        idUser: "A",
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        idUser: "B",
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        idUser: "C",
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        idUser: "D",
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        idUser: "E",
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        idUser: "F",
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },

]
//save tat ca tin nhan nha 
// cai nao load truoc thi load
const dataMessage = [
    { value: "Hello", name: "Davil Nguyen", role: 0 },
    { value: "OK listen", role: '1' },
    { value: "hehehe", name: "Davil Nguyen", role: 1 },
    { value: "Thanks Your", role: 1 },
    { value: "=))) cc", name: "Davil Nguyen", role: 0 },
    { value: ": (((( ", role: 1 },
]
export default class ChatMessage extends React.Component<IListRoom> {
    state = {
        title: '',
        active: 0,
        messages: dataMessage,
        valueChat: '',
        OldIdUser: ""
    }
    socket
    refViewChat: any = React.createRef()
    componentDidMount() {
        this.socket = new SocketMessageChat()
        this.socket.on('receviceMessage', data => {
            console.log('I am recevice Message success', data)
            const {value, idUser}   = data
            this.sendMessage({role : 0 , name : 'Davil Nguyen' ,value , idUser }, true)
        })
        3
    }
    handleSelecteUserChat = ({ active, idUser }) => {
        const { OldIdUser } = this.state
        this.setState({ active })
        // disconnect user old, if not select user else not leave
        if (OldIdUser !== '') {
            this.socket.leave(OldIdUser)
        }
        this.setState({ OldIdUser: idUser }, () => {
            this.socket.join(idUser)
        })
    }
    // need fefactor code below function 
    sendMessage = (objMessage , stateSend = false) => {
        const { value, name } = objMessage
        if (value === '') {
            toast.error("Please, not empty, fill out input : )")
            return
        }

        const { messages } = this.state
        const { scrollHeight } = this.refViewChat
        this.setState({ messages: [...messages, ...[objMessage]], valueChat: '' }, () => {
            this.refViewChat.scrollTo({
                top: scrollHeight, behavior: 'smooth'
            });

        })
        if(stateSend ) return
        console.log('objMessage',objMessage)
        // handle socket send message 
        this.socket.send('sendMessage',objMessage )

    }
    handleFocus =() => {
        this.socket.send('loading' )
    }
    render() {
        const { active, messages, valueChat , OldIdUser} = this.state
    
        return <$Wrapper>
            <PeasonList>
                {
                    listInfoUser.map((user, key) => <div key={key} className={`item_Message ${key === active ? "active" : ''}`}
                    onClick={
                        () => {

                            const { idUser } = user
                            this.handleSelecteUserChat({ active: key, idUser })
                        }
                    }>
                    <h2 className="name_people">
                        {user.name}
                    </h2>
                    <div className="time_message">
                        {user.time}
                    </div>
                    <div className="new_message">
                        {user.newMessage}
                    </div>
                </div>)}
            </PeasonList>
           { OldIdUser !== '' && <ChatZone>
                <div className="title_chatZone">
                    <h1>Davil Nguyen</h1>
                </div>
                <div className="view_chat" ref={(e) => this.refViewChat = e} >
                    {messages.map((message, key) => {
                        const { name, role, value } = message
                        return <div className={`item_chat ${role === 0 ? "friend" : "me"} `} key={key}>
                            <div className="item_chat_value">{value}</div>
                        </div>

                    })}
                </div>
                <div className="input_chat" >
                    <UIInput
                        onChange={(valueChat) => { this.setState({ valueChat }) }}
                        onKeyPress={
                            (event) => {
                                if (event.charCode === 13) {
                                    const { value } = event.target
                                    this.sendMessage({ value, role: 1 , idUser : OldIdUser})
                                }
                            }
                        }
                        onFocus={this.handleFocus}
                        value={valueChat} />
                    <UIButton
                        onMouseDown={() => { this.sendMessage({ value: valueChat, role: 1 , idUser : OldIdUser }) }}
                    >
                        Send
                    </UIButton >
                </div>
            </ChatZone>}
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