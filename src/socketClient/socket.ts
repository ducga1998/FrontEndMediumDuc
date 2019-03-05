import io from 'socket.io-client';
import userContainer from '../Container/userContainer';
import { LINK_DEVELOPMENT } from '../help/help';
const DEFAULT_LINK =  process.env.NODE_ENV === 'production'? '' :LINK_DEVELOPMENT
export const roomSockets = (function room() {
    const socket = io(`${DEFAULT_LINK}/room`, { transports: ['websocket'] })
    return socket
})()
export const chatsockets = (function chat() {
    const socket = io(`${DEFAULT_LINK}/chat`, { transports: ['websocket'] })
    return socket
})()
export const notificationSocket = (function () {
    const socket = io(`${DEFAULT_LINK}/notification`, { transports: ['websocket'] })
    return socket
})()

export const messageChatSocket = (function(){
    const socket = io(`${DEFAULT_LINK}/chatMessage`, { transports: ['websocket'] })
    return socket
})()

// if connect join room => all user need join => 
// socket.join(idUserNeedJoin) => each user want chat in room have idRoom then must use socket.join(idUserNeedRoom)
export function socketNotication(data, type){
    const {name , avatarLink,decentraliz}=userContainer.state.dataUser
    notificationSocket.emit('newNotification',{...data ,...{name , avatarLink,decentraliz,type} })
}