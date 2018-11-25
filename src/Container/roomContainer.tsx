import { Container } from 'unstated-x';
import { getAllRoomFromBackEnd, getRoomstoIdUser } from '../API/roomAPI';
import userContainer from './userContainer';
export interface IArticleContainer {
    isPublicArticle: Boolean
    contentArticle: String
    titleArticle: String

}
class RoomContainer extends Container<any>{

    constructor(data) {
        super(data)
        this.getAllRooms()
        // this.getRoomByIdUser()
    }
    async getAllRooms() {
        const { data: { getAllRoom } } = await getAllRoomFromBackEnd() as any
        // console.log('all data in room', getAllRoom)
        this.setState({ rooms: getAllRoom })
    }
    async getRoomByIdUser() {
        // console.log(userContainer.state.dataUser)
        const { dataUser } = userContainer.state
        if (dataUser) {
            const { data: { getRoomByIdUser } } = await getRoomstoIdUser(dataUser.idUser) as any
            console.log("OK")
            this.setState({ roomsToIdUser: getRoomByIdUser })
            return getRoomByIdUser
        }


    }
}
const roomContainer = new RoomContainer({
    rooms: [],
    roomsToIdUser: null
})

window['room'] = roomContainer
export default roomContainer;