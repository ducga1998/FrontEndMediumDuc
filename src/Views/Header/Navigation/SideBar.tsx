import * as React from 'react'
import styled from 'styled-components';
import { OverLay } from '../../../Components/styled/overlay';
import UIWidget from '../../../Components/UI/UIWidget';
import UIButton from '../../../Components/UI/UIButton';
import { FlexCol, FlexRow, H3, P, Gradient, H1, H2 } from '../../../Components/styled/base';
import { AvatarImage } from '../../../Components/styled/avatar';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';
import StyledCard from '../../../Components/styled/card';
import { IconLink } from '../../../Components/styled/nav';
import Icon from '../../../Components/Icon';
import theme from '../../../theme';
// import OverLay from './overlay';
export default class SideBar extends React.Component<{ open: boolean, setOpen: any, user: any }> {
    componentDidUpdate(prepState, preProps) {

    }
    handleMouseDown = (event) => {
        event.preventDefault()
        // event.stopPropagation()
        this.props.setOpen(false)
    }
    closeSideBar() {
        this.props.setOpen(false)
    }
    render() {
        if(!this.props.user){
            return null
        }
        const { user: { name, avatarLink ,decentraliz , biographical } } = this.props
        console.log('opennnn ok ', this.props.open)
        return <> <UIWidget>
                {this.props.open ? <OverLayNavBar open onMouseDown={this.handleMouseDown} >
                <WrapperSideBar onMouseDown={(event) => { event.stopPropagation() }} >
                   <FlexCol style={{justifyContent : 'flex-end'}}>
                   <UIButton onMouseDown={this.handleMouseDown} icon="view-back" category="sidebar"  style={{alignSelf:  'flex-end' , margin : '10px', padding : '5px'}} type="soild"  /> </FlexCol> 
                    <UIFieldAlgin 
                        shadow = {`2px -1px 20px 2px ${theme.brand.alt}`}
                        style={{
                            alignItems: 'flex-start',
                            padding: '20px',
                            backgroundColor: '#ffffff',
                            borderRadius: '6px',
                            margin: '10px'
                        }} 
                        horizontal
                    >
                    <H2>WellCome to {name}</H2>
                    <UIFieldAlgin >
                        <AvatarImage src={avatarLink} size={80} radius="24px" />
                        <UIFieldAlgin horizontal style={{ paddingLeft: '10px' }}>
                            <H3>{name}</H3>
                            <P>{biographical}</P>
                        </UIFieldAlgin>
                    </UIFieldAlgin>
                    </UIFieldAlgin>
                    <UIFieldAlgin horizontal> 
                        <TextCard to="/profile"> <Icon glyph="home" /> Profile</TextCard>
                        <TextCard to="/stories">Stories</TextCard>
                        <TextCard to="/bookmarks">Bookmark</TextCard>
                        {
                            decentraliz === 3?
                                <>
                                    <TextCard to="/managerAccount">Manager All Account</TextCard>
                                    <TextCard to="/managerArticles">Manager Articles</TextCard>
                                </>
                            :null
                        }
                    </UIFieldAlgin>
                </WrapperSideBar>
            </OverLayNavBar> : null}
        </UIWidget> </>
    }
}
const OverLayNavBar = styled(OverLay)`
    align-items : flex-start;
    justify-content :  initial;
    background : transparent;
    
`
const TextCard = styled(IconLink)`
    margin: 2px 10px;
    justify-content : flex-start;
    padding : 20px;
    font-size : 16px;
    font-stretch : 800;
    background: ${props => props.theme.bg.default};
    position: relative;
    width : auto;
    background-clip: padding-box;
    overflow: hidden;
    border-bottom : 2px solid ${props => props.theme.bg.hairline};
    flex: none;
    + div,
    + span {

        @media (max-width: 768px) {
        margin-top: 2px;
        }
    }

    @media (max-width: 768px) {
        border-radius: 0;
        box-shadow: none;
    }
    &:hover {
        background-color : ${props => props.theme.bg.wash};
    }
    &:focus {
        background-color : ${props => props.theme.bg.hairline}
    } 
    color : ${props => props.theme.text.default};
    

`
const WrapperSideBar = styled.div`
    overflow : scroll;
    width: 400px;
    height : 100%;
    box-shadow: 2px -1px 20px 2px ${props => props.theme.brand.alt};
    position : fixed;
    /* radial-gradient(ellipse farthest-corner at top left,#7b16ff 43%,#16171a94 100%) */
    background-image :${props => Gradient(props.theme.brand.alt, '#16171a94', '45%')};
`
