import styled from "styled-components";
import { LogoLink } from "../../../Components/styled/nav";
import { StyledCard } from "../../../Components/styled/card";
import * as React from 'react'
import Icon from "../../../Components/Icon";
import { H3, Shadow } from "../../../Components/styled/base";
import { getAllNotificationByIdUser, IdNotificationType } from "../../../API/notificationAPI";
import { AvatarImage } from "../../../Components/styled/avatar";
import { filterStringHTML, dieEvent } from "../../../help/help";
import UIFieldAlgin from "../../../Components/UI/UIFieldAlgin";
import Link from "src/Components/Link";
import { StyledTextButton } from "../../../Components/styled/button";
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
        case 'ReplyComment':
            notification = <div><Link to={`/user/${idUser}`}>{name}</Link> <i>đã reply comment trong bài viết {titleArticle} của bạn</i></div>
            break
        default:
            notification
    }
    return notification
}
const { useEffect } = React as any
export default function Notification() {
    const [data, setData] = React.useState([] as IdNotificationType[])
    const [offset, setOffset] = React.useState(0)
    const [open, setOpen] = React.useState(false)
    async function handleLoadMore(event) {
        event.preventDefault()
        event.stopPropagation()
        const count = offset + 10
        await setOffset(count)
        const allNotification = await getAllNotificationByIdUser(count, 10)

        setData([...allNotification, ...data])
    }
    useEffect(async () => {
        const allNotification = await getAllNotificationByIdUser(0, 10)
        setData(allNotification)
        return null
    }, [])
    return <><NavButton
        onMouseDown={async (e) => { e.preventDefault(); await setOpen(!open) }}>
        <Icon glyph="notification" />
        {open && <><DropDown onMouseDown={(event) => dieEvent(event)} onMouseLeave={() => setOpen(false)}  >
            <div className="pduc-overflow">  {
                data && data.length > 0 ? data.map((notifi, key) => {
                    const { type, notificationData: { avatarLink, name }, time } = notifi
                    const view = handleTypeNotification(type, notifi.notificationData)
                    return <Card key={key} >
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
`

export const NavButton = styled.div`
 position : relative;
  color : ${props => props.theme.text.reverse};
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor : pointer;
  &:after {
        margin-top: 4px;
        font-size: 0.75em;
      }
    
`;