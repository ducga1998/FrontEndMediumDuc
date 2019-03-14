import { notificationSocket } from "./socket";
import { toast } from "react-toastify";
import { filterStringHTML } from "../help/help";
import * as React from 'react'
import styled from "styled-components";
import {  H3 } from "src/Components/styled/base";
import { AvatarImage } from "../Components/styled/avatar";
import { Label } from "../Components/styled/button";
export function notificationFuncSocket(user: any) {
    if (user && user.idUser) {
        // now, user create room 
        notificationSocket.emit('join', user.idUser)
        notificationSocket.on('notificationRun', (data) => {
            toast(<NotificationStyle {...data} />
                , {
                   position :  toast.POSITION.BOTTOM_LEFT
                })
        })
    }
}
const NotificationStyle = (props) => {
    const { titleArticle, name, type, avatarLink } =  props
    let  contentNotifi = ''
    if (type === 'Comment') {
         contentNotifi = ` 😎${type} vào bài viết  : ${filterStringHTML(titleArticle)} của bạn `
    }
    if(type === 'ReplyComment'){
       contentNotifi = ` 😎trả lời bình luận của bạn tại bài viết${filterStringHTML(titleArticle)}`
    }
    if (type === 'Follow') {
      contentNotifi = ` 😎${type} bạn `
    }
    if(type=== 'Bookmark'){
        contentNotifi = ` 😎bookmark bài viết ${filterStringHTML(titleArticle)} của bạn `
      
    }
    return <WrapperNotification className="md-notification-wrapper">
         <AvatarImage src={avatarLink} /><Label >{name} đã</Label> <H3>{contentNotifi}</H3>  😀😀
    </WrapperNotification>
}
const WrapperNotification = styled.div`
    /* padding : 20px; */
    /* background : ${props => props.theme.bg.default}; */
    /* border-radius : 20px; */
`