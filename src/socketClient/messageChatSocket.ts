import { messageChatSocket } from "./socket";

export default class SocketMessageChat {
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
        this.socket.emit('join', idUser)
    }

    leave(idUser) {
        this.socket.emit('leave', idUser)
    }


}