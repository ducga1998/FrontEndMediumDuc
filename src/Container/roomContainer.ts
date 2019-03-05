// import { Container } from 'unstated-x';
// import { getAllRoomFromBackEnd, getRoomstoIdUser } from '../API/roomAPI';
// import userContainer from './userContainer';
// export interface IArticleContainer {
//     isPublicArticle: Boolean
//     contentArticle: String
//     titleArticle: String

// }
// class RoomContainer extends Container<any>{

//     constructor(data) {
//         super(data)
//         this.getAllRooms()
//         // this.getRoomByIdUser()
//     }
//     async getAllRooms() {
//         const rooms = await getAllRoomFromBackEnd() as any
//         // console.log('all data in room', getAllRoom)
//         this.setState({ rooms })
//     }
//     async getRoomByIdUser() {
//         // console.log(userContainer.state.dataUser)
//         const { dataUser } = userContainer.state
//         if (dataUser) {
//             const roomsToIdUser = await getRoomstoIdUser(dataUser.idUser) as any
//             console.log("OK")
//             this.setState({ roomsToIdUser })
//             return roomsToIdUser
//         }
//     }
// }
// const roomContainer = new RoomContainer({
//     rooms: [],
//     roomsToIdUser: []
// })

// window['room'] = roomContainer
// export default roomContainer;