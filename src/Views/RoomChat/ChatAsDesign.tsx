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
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
        name: "duc",
        time: "now",
        newMessage: "ok roi nha"
    },
    {
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
        valueChat: ''
    }
    socket
    refViewChat : any  = React.createRef()
    componentDidUpdate() {

    }
     componentDidMount() {
            this.socket =  new SocketMessageChat() 
            this.socket.send('ok' ,'duc')
        
    }
    handleClickMessage = (active) => {
        this.setState({ active })
    }
     sendMessage =  (value) => {
         if(value === ''){
            toast.error("Please, not empty, fill out input : )")
            return
        }
        const { messages } = this.state
        const {scrollHeight} = this.refViewChat 
         this.setState({ messages: [...messages, ...[{ value, role: 1 }]] , valueChat : '' } , () => {
            this.refViewChat.scrollTo({
                top : scrollHeight,behavior: 'smooth'
              }); 
        })
           
             
    }
    render() {
        const { active, messages, valueChat } = this.state
        return <$Wrapper>
            <PeasonList>
                {listInfoUser.map((user, key) => <div className={`item_Message ${key === active ? "active" : ''}`}
                    onClick={
                        () => this.handleClickMessage(key)
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
            <ChatZone>
                <div className="title_chatZone">
                    <h1>Davil Nguyen</h1>
                </div>
                <div className="view_chat" ref={(e) => this.refViewChat = e} >
                    {messages.map(message => {
                        const { name, role, value } = message
                        return <div className={`item_chat ${role === 0 ? "friend" : "me"} `}>
                            <div className="item_chat_value">{value}</div>
                        </div>

                    })}
                </div>
                <div className="input_chat" >
                    <UIInput
                        onChange={(valueChat) => { this.setState({ valueChat }) }}
                        onKeyPress={
                          (event) =>   {
                            if (event.charCode === 13) {
                                this.sendMessage(event.target.value)
                            }
                          }
                        }
                        value={valueChat} />
                    <UIButton
                
                        onMouseDown={() => { this.sendMessage(valueChat) }}
                    >
                        Send
                    </UIButton >
                </div>
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
    constructor(){
        // this.socket = messageChatSocket as any
        this.socket.on('connection', () => {
            console.log('connection socket')
        })
    }
    send(...args){
        this.socket.emit(...args)
    }
    on(){
        
    }

    
}