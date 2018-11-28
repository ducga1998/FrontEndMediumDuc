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

