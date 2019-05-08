import * as React from 'react';
import { Nav, LogoLink, IconLink, Label } from '../../../Components/styled/nav';
import Icon from '../../../Components/Icon';
import Search from '../Search/search';
import ButtonArticle from '../ButtonWrite';
import userContainer from '../../../Container/userContainer';
import styled from 'styled-components';
import UIPopUp from '../../../Components/UI/UIPopUp';
import { Shadow, FlexCol } from '../../../Components/styled/base';
import SideBar from './SideBar';
import Notification from './notification'
import { AvatarImage } from 'src/Components/styled/avatar';
class Navbar extends React.Component<any> {
    state = {
        sideBarOpen: false,
        notificationOpen: false
    }
    navRef: HTMLElement
    componentDidMount() {
        window.addEventListener('scroll', (e : UIEvent) => {
            if (window.scrollY < 1) {
                this.navRef.style.position = ''
            }
            else {
                this.navRef.style.position = 'fixed'
            }
        })
    }
    render() {
        const { dataUser } = userContainer.state
        const { avatarLink } = dataUser
        const { sideBarOpen } = this.state
        const location = window.location.href
        return <Nav ref={e => this.navRef = e}>
            <Nav>
                <NavButton to="/" onClick={async (e) => { e.preventDefault(); await this.setState({ sideBarOpen: true }) }}>
                    <Icon onClick={() => { this.setState({ sideBarOpen: true }) }} glyph="menu" />
                    <SideBar user={dataUser} open={sideBarOpen} setOpen={() => { this.setState({ sideBarOpen: false }) }} />
                </NavButton>

                <IconLink to="/home" data-active={location.includes('home')}>
                    <Icon glyph="home" />
                    <Label> Home </Label>
                </IconLink>
                <IconLink to="/chatMessage/no" data-active={location.includes('chat')}>
                    <Icon glyph="message" />
                    <Label> Chat</Label>
                </IconLink>
                <IconLink to="/community" data-active={location.includes('community')}>
                    <i className="fas fa-users" /> <Label>Community</Label>
                </IconLink>
                <IconLink to="/about" data-active={location.includes('about')}>
                    <i className="fas fa-info" /> <Label>About</Label>
                </IconLink>
              
            </Nav>
            <Nav>
                <ButtonArticle />
                <IconLink to="/writearticle" ><i className="fas fa-pencil-alt" />  </IconLink>
                <Notification />
                <Search />
                <UIPopUp trigger={<div style={{ backgroundColor: 'white' }}  >
                    <AvatarImage size={30} src={avatarLink} />
                </div>}>
                    <div style={{ display: 'flex' }}>
                        <Wrapper>
                            <IconLink to="/profile"><i className="fas fa-user-circle" /> <Label>Profile</Label></IconLink>
                            <IconLink to="/stories"><i className="fas fa-store-alt" /><Label>Stories</Label></IconLink>
                            <IconLink to="/bookmarks"><i className="fas fa-bookmark" /> <Label>Bookmark</Label></IconLink>
                            <IconLink to="/writearticle"><i className="fas fa-pencil-alt" /><Label>Write</Label></IconLink>
                            <IconLink to="/logout" ><i className="fal fa-sign-out" /><Label>Logout</Label></IconLink>
                        </Wrapper>
                    </div>
                </UIPopUp>
            </Nav>
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