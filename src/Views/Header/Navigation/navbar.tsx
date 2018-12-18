import * as React from 'react';

import { Section, Nav, LogoLink, Logo, IconLink, Label } from '../../../Components/styled/nav';

import medium from './medium.svg'
import Icon from '../../../Components/Icon';
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import Search from '../Search/search';
import ButtonArticle from '../buttonWriteArticle';
import { Subscribe } from 'unstated-x';
import userContainer from '../../../Container/userContainer';
import styled from 'styled-components';
import UIPopUp from '../../../Components/UI/UIPopUp';
class Navbar extends React.Component {
    render() {
        const location = window.location.href
        return <Nav>
            <LogoLink to="/home">
                <Logo src={IMAGE_SOURCE_DEFAULT} role="presentation" />
                {/* <span dangerouslySetInnerHTML={{ __html: medium }} /> */}
            </LogoLink>

            <IconLink to="/home" data-active={location.includes('home')}>
                <Icon glyph="home" />
                <Label> Home</Label>

            </IconLink>
            <IconLink to="/chat" data-active={location.includes('chat')}>
                <Icon glyph="message" />
                <Label> Chat</Label>
            </IconLink>
            <IconLink to="/stories" data-active={location.includes('stories')}>
                <Label >Stories</Label>
            </IconLink>
            <IconLink to="/bookmarks" data-active={location.includes('bookmarks')}>
                <Label >Bookmark</Label>
            </IconLink>
            <IconLink to="/about" data-active={location.includes('about')}>
                <Label> About </Label>
            </IconLink>
            <UIPopUp trigger ={<Button>  <Icon glyph="Setting" />Setting</Button>}>
            <div style={{ display: 'flex' }}>
                <Search />
                {window.location.pathname === '/home' ?
                    <IconLink to="/writearticle" > <Label>writearticle</Label></IconLink> : null}
                <ButtonArticle />

                <Subscribe to={[userContainer]} >
                    {
                        container => {
                            const { login, dataUser } = container.state
                            return <Nav>{!login ? <IconLink to="/login">Login</IconLink> : <> <IconLink to="/profile" > Profile</IconLink>
                           <IconLink to="/stories" >Stories</IconLink>
                           <IconLink to="/bookmarks" >Bookmark</IconLink>
                           <IconLink to="/writearticle" >Write Article</IconLink>
                           <IconLink to="/logout" >Logout</IconLink></>}
                           </Nav>
                        }
                    }
                </Subscribe>
            </div>
            </UIPopUp>
        </Nav>
    }
}
const Button = styled(IconLink.withComponent('button'))`
    background : red;
    cursor : pointer;
`
export default Navbar