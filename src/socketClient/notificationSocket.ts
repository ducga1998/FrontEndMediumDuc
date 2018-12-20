import { notificationSocket } from "./socket";
import { toast } from "react-toastify";

export function notificationFuncSocket(user : any)  {
    if (user && user.idUser)    {
        notificationSocket.emit('join' , user.idUser)
        notificationSocket.on('notificationRun', (data) => {
            const { titleArticle, content, name, type, avatarLink } = data
            toast.info(`${name} đã ${type} vào bài viết có title : ${titleArticle} với nội dung ${content}`, {
                position: toast.POSITION.BOTTOM_LEFT
            })
        })
    }
}