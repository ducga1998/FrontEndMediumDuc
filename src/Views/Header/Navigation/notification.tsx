import styled from "styled-components";
import { LogoLink } from "../../../Components/styled/nav";
import { StyledCard } from "../../../Components/styled/card";
import * as React from 'react'
import Icon from "../../../Components/Icon";
import { H3 } from "../../../Components/styled/base";
export default function Notification({open , setOpen}) {
    
    return <NavButton to="/" onHo={async (e: Event) => { e.preventDefault(); }}>
        <Icon onClick={() => {setOpen(!open) }} glyph="notification" />
        <DropDown open={open} >
            <StyledCard><H3>dcdscnsdj</H3></StyledCard>
            <StyledCard><H3>dcdscnsdj</H3></StyledCard>
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