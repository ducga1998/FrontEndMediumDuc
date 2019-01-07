import styled from "styled-components";
import { LogoLink } from "../../../Components/styled/nav";
import { StyledCard } from "../../../Components/styled/card";
import * as React from 'react'
import Icon from "../../../Components/Icon";
import { H3 } from "../../../Components/styled/base";
import { getAllNotificationByIdUser } from "../../../API/notificationAPI";
import { AvatarImage } from "../../../Components/styled/avatar";
import { filterStringHTML } from "../../../help/help";
import UIFieldAlgin from "../../../Components/UI/UIFieldAlgin";
import Link from "src/Components/Link";
import { StyledTextButton } from "../../../Components/styled/button";
const {useEffect, useState} = React as any
function handleTypeNotification(type , data){
    let { name,titleArticle , idUser} = data
    titleArticle = filterStringHTML(titleArticle)
    let notification 
    switch(type){
        case 'Bookmark' :
        notification = <div><Link to={`/user/${idUser}`}>{name}</Link> <i>đã bookmark bài {titleArticle} của bạn</i></div>
        break;
        case 'Follow':
        notification = <div><Link to={`/user/${idUser}`}>{name}</Link><i> đã follow bạn</i></div>
        break;
        case 'Comment': 
        notification = <div><Link to={`/user/${idUser}`}>{name}</Link> <i>đã comment trong bài viết {titleArticle} của bạn</i></div>
        break;
        case 'RelyComment': 
        notification = <div><Link to={`/user/${idUser}`}>{name}</Link> <i>đã rely comment trong bài viết {titleArticle} của bạn</i></div>
         break
         default : 
         notification 
    }
    return notification

}

export default function Notification({open , setOpen}) {
    const [data,  setData] = useState([])
    const [offset , setOffset]  = useState(0)
   async  function handleLoadMore(event) {
    //    const offset =  offset ++
        const count = offset +5
        await  setOffset( count)
        const allNotification = await getAllNotificationByIdUser( count ,5) as any[]

        setData([...data ,...allNotification])
    }
    useEffect(async () => {
        const allNotification = await getAllNotificationByIdUser( 0 ,5)

        setData(allNotification)
        return () => { console.log('un mount if okokok ')}
    },[])
    return <NavButton to="/" onClick={async (e: Event) => { e.preventDefault(); }}>
        <Icon onClick={() => {setOpen(!open) }} glyph="notification" />
        <DropDown open={open}  >
        {data && data.length > 0? data.map(notifi => {
            const {type , notificationData : {avatarLink ,name} , time}  = notifi
        const view =  handleTypeNotification(type , notifi.notificationData)
             return  <Card >
                 <UIFieldAlgin>
                 <AvatarImage size={30} src={avatarLink} /> 
                 <H3>{name}</H3>
                 </UIFieldAlgin>
                 <H3>{view}</H3>
                 </Card>
        }) : null }
        <StyledTextButton onMouseDown ={handleLoadMore}>Load More</StyledTextButton>
        </DropDown>
    </NavButton>
}
const DropDown = styled.div<any>`
    position : absolute;
    top : 50px;
    left : -226px;
    width : 300px;
    height : 640px;
    overflow : scroll;
    border-radius: 6px;
    background-color: #f2f2f2;
    box-shadow: 2px 1px 20px 0px white;
    visibility :${(props: any) => props.open ? 'visible' : 'hidden'}
    
    
`
const Card = styled(StyledCard)`
    padding : 20px;
    padding: 15px 0px;
    &:hover{
        background-color : ${props => props.theme.bg.hairline};
    }
`
const NavButton = styled(LogoLink)`
position : relative;
`