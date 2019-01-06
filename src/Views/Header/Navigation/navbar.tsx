import * as React from 'react';

import { Nav, LogoLink, Logo, IconLink, Label } from '../../../Components/styled/nav';
import Card from '../../../Components/styled/card';
import Icon from '../../../Components/Icon';
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import Search from '../Search/search';
import ButtonArticle from '../buttonWriteArticle';
import { Subscribe } from 'unstated-x';
import userContainer from '../../../Container/userContainer';
import styled from 'styled-components';
import UIPopUp from '../../../Components/UI/UIPopUp';
import { Shadow, hexa, FlexCol } from '../../../Components/styled/base';
import theme from '../../../theme';
import SideBar from './SideBar';
import Notification from './notification'
class Navbar extends React.Component<any> {
    state = {
        sideBarOpen: false,
        notificationOpen: false
    }
    render() {
        const { dataUser } = userContainer.state
        const { sideBarOpen, notificationOpen } = this.state
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
            <IconLink to="/chat" data-active={location.includes('chat')}>
                <Icon glyph="message" />
                <Label> Chat</Label>
            </IconLink>
            <IconLink to="/about" data-active={location.includes('about')}>
                <Label> About </Label>
            </IconLink>
            <ButtonArticle />
            <IconLink to="/writearticle" > <Label>Write Article</Label></IconLink>
            <Notification open={notificationOpen} setOpen={() => this.setState({ notificationOpen: !notificationOpen })} />
            <UIPopUp trigger={<Button data-active={true}> <Icon glyph="settings" />  Setting</Button>}>
                <div style={{ display: 'flex' }}>
                    <Subscribe to={[userContainer]} >
                        {
                            container => {
                                const { login } = container.state
                                return <Wrapper>{!login ? <IconLink to="/login">Login</IconLink> :
                                    <>
                                        <StyledCard><Search /></StyledCard>
                                        <StyledCard><IconLink to="/profile"> Profile</IconLink></StyledCard>
                                        <StyledCard><IconLink to="/stories">Stories</IconLink></StyledCard>
                                        <StyledCard><IconLink to="/bookmarks">Bookmark</IconLink></StyledCard>
                                        <StyledCard><IconLink to="/writearticle" >Write Article</IconLink></StyledCard>
                                        <StyledCard style={{ backgroundColor: theme.warn.default }}><IconLink to="/logout" >Logout</IconLink></StyledCard>
                                    </>}
                                </Wrapper>
                            }
                        }
                    </Subscribe>
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
`
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  box-shadow: ${Shadow.high} ${({ theme }) => hexa(theme.bg.reverse, 0.15)};
  overflow: hidden;
  align-items: stretch;
  display: inline-block;
  
  width  : 100%;
  border-radius: 8px;
  margin  : 0px;
  padding : 10px;
    a{
       color : ${props => props.theme.text.reverse};
   }
    &:hover {
    background-color : ${props => props.theme.bg.reverse};
  
}
    
`;
const Button = styled(IconLink.withComponent('a'))`
    cursor : pointer;
    background-color : ${props => props.theme.settings.default};
    border-left : 5px solid ${props => props.theme.bg.default};

`
export default Navbar