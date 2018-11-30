import io from 'socket.io-client';
const DEFAULT_LINK = 'http://localhost:4000'

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
// if connect join room => all user need join => 
// socket.join(idUserNeedJoin) => each user want chat in room have idRoom then must use socket.join(idUserNeedRoom)

