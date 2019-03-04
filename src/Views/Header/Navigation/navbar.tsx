import * as React from 'react';
import { Nav, LogoLink, IconLink, Label } from '../../../Components/styled/nav';
import Icon from '../../../Components/Icon';
import Search from '../Search/search';
import ButtonArticle from '../buttonWriteArticle';
import userContainer from '../../../Container/userContainer';
import styled from 'styled-components';
import UIPopUp from '../../../Components/UI/UIPopUp';
import { Shadow,  FlexCol } from '../../../Components/styled/base';
import SideBar from './SideBar';
import Notification from './notification'
class Navbar extends React.Component<any> {
    state = {
        sideBarOpen: false,
        notificationOpen: false
    }
    render() {
        const { dataUser } = userContainer.state
        const { sideBarOpen } = this.state
        const location = window.location.href
        return <Nav>
            <NavButton to="/" onClick={async (e: Event) => { e.preventDefault(); await this.setState({ sideBarOpen: true }) }}>
                <Icon onClick={() => { this.setState({ sideBarOpen: true }) }} glyph="menu" />
                <SideBar user={dataUser} open={sideBarOpen} setOpen={() => { this.setState({ sideBarOpen: false }) }} />
            </NavButton>
            <IconLink to="/home" data-active={location.includes('home')}>
                <Icon glyph="home" />
                <Label> Home </Label>
            </IconLink>
            <IconLink to="/chatMessage/no/ok" data-active={location.includes('chat')}>
                <Icon glyph="message" />
                <Label> Chat</Label>
            </IconLink>
            <IconLink to="/about" data-active={location.includes('about')}>
                <Label> About </Label>
            </IconLink>
            <ButtonArticle />
            <IconLink to="/writearticle" > <Label>Write Article</Label></IconLink>
            <Notification />
            <Search />
            <UIPopUp trigger={<Button data-active={true}>   Setting</Button>}>
                <div style={{ display: 'flex' }}>
                    <Wrapper>
                      
                        <IconLink to="/profile"> Profile</IconLink>
                        <IconLink to="/stories">Stories</IconLink>
                        <IconLink to="/bookmarks">Bookmark</IconLink>
                        <IconLink to="/writearticle">Write Article</IconLink>
                        <IconLink to="/logout" >Logout</IconLink>
                    </Wrapper>
                </div>
            </UIPopUp>
        </Nav>
    }
}

const NavButton = styled(LogoLink)`
    position : relative;
`
const Wrapper = styled(FlexCol)`
    width  :100%;
    box-shadow: ${Shadow.high};
    ${IconLink}{
        padding: 10px 20px;
        color: ${props => props.theme.text.default};
        width: auto;
        margin: 0px;
        font-stretch : 800;
        border-bottom: 1px solid  ${props => props.theme.bg.border};
        &:hover{
            background :  ${props => props.theme.bg.wash};
            box-shadow : none;
        }
    }
`
const Button = styled(IconLink.withComponent('a'))`
    cursor : pointer;

`
export default Navbar