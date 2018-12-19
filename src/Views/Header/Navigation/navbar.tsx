import * as React from 'react';

import { Section, Nav, LogoLink, Logo, IconLink, Label } from '../../../Components/styled/nav';
import  Card  from '../../../Components/styled/card';
import medium from './medium.svg'
import Icon from '../../../Components/Icon';
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import Search from '../Search/search';
import ButtonArticle from '../buttonWriteArticle';
import { Subscribe } from 'unstated-x';
import userContainer from '../../../Container/userContainer';
import styled from 'styled-components';
import UIPopUp from '../../../Components/UI/UIPopUp';
import UIDropDown from '../../../Components/UI/UIDropDown';
import { Shadow, hexa, FlexCol } from '../../../Components/styled/base';
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
            {window.location.pathname === '/home' ?
                    <IconLink to="/writearticle" > <Label>writearticle</Label></IconLink> : null}
            <UIPopUp trigger ={<Button> Setting</Button>}>
            <div style={{ display: 'flex' }}>
          
               
                <ButtonArticle />

                <Subscribe to={[userContainer]} >
                    {
                        container => {
                            const { login, dataUser } = container.state
                            return <Wrapper>{!login ? <IconLink to="/login">Login</IconLink> :
                             <>  
                                <StyledCard><IconLink to="/profile"> Profile</IconLink></StyledCard>
                                <StyledCard><IconLink to="/stories">Stories</IconLink></StyledCard> 
                                <StyledCard><IconLink to="/bookmarks">Bookmark</IconLink></StyledCard> 
                                <StyledCard><IconLink to="/writearticle" >Write Article</IconLink></StyledCard> 
                                <StyledCard><IconLink to="/logout" >Logout</IconLink></StyledCard> 
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
const Wrapper  = styled(FlexCol)`

    width  :100%;
`
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  box-shadow: ${Shadow.high} ${({ theme }) => hexa(theme.bg.reverse, 0.15)};
  max-height: 640px;
  overflow: hidden;
  align-items: stretch;
  display: inline-block;
  width  : 100%;
  border-radius: 8px;
  margin  : 0px;
  padding : 10px;
&:hover {
    background-color : ${props =>props.theme.bg.inactive};
    transition : .2s;
}
`;
const Button = styled(IconLink.withComponent('a'))`
    cursor : pointer;
    
`
export default Navbar