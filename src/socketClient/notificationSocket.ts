import { notificationSocket } from "./socket";
import { toast } from "react-toastify";
import { filterStringHTML } from "../help/help";

export function notificationFuncSocket(user: any) {
    if (user && user.idUser) {
        // now, user create room 
        notificationSocket.emit('join', user.idUser)
        notificationSocket.on('notificationRun', (data) => {
            const { titleArticle, name, type, avatarLink } = data
            if (type === 'Comment') {
                toastNotification(`${name} đã ${type} vào bài viết  : ${filterStringHTML(titleArticle)} của bạn `)
            }
            if(type === 'RelyComment'){
                toastNotification(`${name} đã trả lời bình luận của bạn tại bài viết${filterStringHTML(titleArticle)}`)
            }
            if (type === 'Follow') {
                toastNotification(`${name} đã ${type} bạn `)
            }
            if(type=== 'Bookmark'){
                toastNotification(`${name} đã bookmark bài viết ${filterStringHTML(titleArticle)} của bạn `)
            }
        })
    }
}
function toastNotification(content, position = toast.POSITION.BOTTOM_LEFT) {
    toast.info(content, {
        position
    })
}