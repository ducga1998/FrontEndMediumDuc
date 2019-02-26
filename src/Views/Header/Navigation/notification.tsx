import styled from "styled-components";
import { LogoLink } from "../../../Components/styled/nav";
import { StyledCard } from "../../../Components/styled/card";
import * as React from 'react'
import Icon from "../../../Components/Icon";
import { H3, Shadow } from "../../../Components/styled/base";
import { getAllNotificationByIdUser } from "../../../API/notificationAPI";
import { AvatarImage } from "../../../Components/styled/avatar";
import { filterStringHTML, dieEvent } from "../../../help/help";
import UIFieldAlgin from "../../../Components/UI/UIFieldAlgin";
import Link from "src/Components/Link";
import { StyledTextButton } from "../../../Components/styled/button";
const { useEffect, useState } = React as any
function handleTypeNotification(type, data) {
    let { name, titleArticle, idUser } = data
    titleArticle = filterStringHTML(titleArticle)
    let notification
    switch (type) {
    
        case 'Bookmark':
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
        default:
            notification
    }
    return notification
}
export default function Notification() {
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)
    const [open, setOpen] = useState()
    async function handleLoadMore(event) {
        event.preventDefault()
        event.stopPropagation()
        const count = offset + 10
        await setOffset(count)
        const allNotification = await getAllNotificationByIdUser(count, 10) as any[]

        setData([...allNotification , ...data ])
    }
    useEffect(async () => {
        const allNotification = await getAllNotificationByIdUser(0, 10)
        setData(allNotification)
        return () => { console.log('un mount if okokok ') }
    }, [])
    return <><NavButton
            to="/"
            onMouseDown={async (e) => { e.preventDefault(); await setOpen(!open) }}>
        <Icon glyph="notification" />
        {open && <><DropDown onMouseDown={(event) =>dieEvent(event)} onMouseLeave ={ () => setOpen(false) }  >
          <div className="pduc-overflow">  {
                data && data.length > 0 ? data.map(notifi => {
                    const { type, notificationData: { avatarLink, name }, time } = notifi
                    const view = handleTypeNotification(type, notifi.notificationData)
                    return <Card >
                        <UIFieldAlgin>
                            <AvatarImage size={30} src={avatarLink} />
                            <H3>{name}</H3>
                        </UIFieldAlgin>
                        <H3>{view}</H3>
                    </Card>
                }) : null
            }</div>
            <StyledTextButton style={{ margin: 'auto' }} onMouseDown={handleLoadMore}>Load More</StyledTextButton>
        </DropDown>
      
        </>}
    </NavButton>
    </>

}
const Card = styled(StyledCard)`
    padding : 5px 0px 5px 10px;
    transition: .2s;
    width : 300px;
    &:hover{
        background-color : ${props => props.theme.bg.hairline};
    }
`
const DropDown = styled.div`
    position : absolute;
    top : 50px;
    height : 800px;
    border-radius: 6px;
    box-shadow : ${Shadow.low};
    .pduc-overflow{
        overflow-y : scroll;
        height : 100%;
    }
    ${Card}:nth-child(2){
        background : red;
    }
   
`

const NavButton = styled(LogoLink)`
    position : relative;
`