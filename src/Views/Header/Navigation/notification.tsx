import styled from "styled-components";
import { LogoLink } from "../../../Components/styled/nav";
import { StyledCard } from "../../../Components/styled/card";
import * as React from 'react'
import Icon from "../../../Components/Icon";
import { H3 } from "../../../Components/styled/base";
import { getAllNotificationByIdUser } from "../../../API/notificationAPI";
import { AvatarImage } from "../../../Components/styled/avatar";
const {useEffect, useState} = React as any
function handleTypeNotification(type , data){
    const { name,titleArticle} = data
    let notification = ''
    switch(type){
        case 'Bookmark' :
        notification = `${name} đã bookmark bài ${titleArticle} của bạn`
        break;
        case 'Follow':
        notification = `${name} đã follow bạn`
        break;
        case 'Comment': 
        notification = `${name} đã comment trong bài viết ${titleArticle} của bạn`
        break;
        case 'RelyComment': 
        notification = `${name} đã rely comment trong bài viết ${titleArticle} của bạn`
         break
         default : 
         notification = ''
    }
    console.log('notification',notification)
    return notification

}
export default function Notification({open , setOpen}) {
    const [data,  setData] = useState([])
    useEffect(async () => {
        const allNotification = await getAllNotificationByIdUser()
        console.log('allNotification',allNotification)
        setData(allNotification)
        return () => { console.log('un mount')}
    },[])
//     avatarLink: "https://www.tutorialspoint.com/socket.io/images/logo.png"
// decentraliz: 1
// idUser: "065727f0-f082-11e8-8f63-5bcf15cefb2c"
// name: "ngyen minh duc"
// titleArticle: "This yesterday review of GemPages proves 2 things:"
// type: "Bookmark"
    //"idNotification", "idUser", "type", "notificationData", "time"
    return <NavButton to="/" onClick={async (e: Event) => { e.preventDefault(); }}>
        <Icon onClick={() => {setOpen(!open) }} glyph="notification" />
        <DropDown open={open} >
        {data && data.length > 0? data.map(notifi => {
            const {type , notificationData : {avatarLink} , time}  = notifi
        const view =  handleTypeNotification(type , notifi.notificationData)
             return  <StyledCard ><AvatarImage size={30} src={avatarLink} /><H3>{view}</H3></StyledCard>
        }) : null }
            
         
            <StyledCard><H3>dcdscnsdj</H3></StyledCard>
        </DropDown>
    </NavButton>
}
const DropDown = styled.div<any>`

    position : absolute;
    top : 50px;
    left : -226px;
    width : 300px;
    height : 400px;
    background-color : blue;
    border-radius: 6px;
    background-color: #f2f2f2;
    box-shadow: 2px 1px 20px 0px white;
    visibility :${(props: any) => props.open ? 'visible' : 'hidden'}
    ${StyledCard}{
        padding : 20px;
        padding: 15px 0px
        
    }
`
const NavButton = styled(LogoLink)`
position : relative;
`