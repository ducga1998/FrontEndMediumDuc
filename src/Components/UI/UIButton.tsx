import * as React from 'react';
import styled from 'styled-components';
import { StyledOutlineButton, StyledSolidButton, StyledTextButton } from '../styled/button';
import Icon from '../Icon';
import { Spinner } from '../styled/base';
import { Link } from 'react-router-dom';
interface IUIButton {
    width ?: any
    height ?:any
    children?: any
    onMouseDown?: (e: any) => any,
    style?: any,
    keyButton?: number,
    active?: boolean,
    icon ? :string
    category ?:'danger'| 'space' |'success'|'sidebar',
    isLoading ?: boolean,
    type ?: 'outline'| 'soild' |'text'
    to?: string
}
export default function UIButton({ type , to,
    children, onMouseDown, style, keyButton, active, icon ,category, isLoading
}: IUIButton) {
    let categoryButton
    switch (category) {
        case 'danger':
        categoryButton = 'warn.default'
            break;
            case 'space':
            categoryButton="space.default"
            break;
            case 'success':
            categoryButton ="success.default"
            case 'sidebar' : 
            categoryButton ="brand.default"
            break;
    
        default:
            break;
    }
    let Button 
    switch(type ){
        case 'soild' :
        Button = StyledSolidButton
        break;
        case 'text' :
        Button = StyledTextButton
        break;
        default :
        Button = StyledOutlineButton
    }
    if(to){
        return  <ButtonLink  style={style} to={to}
        color={categoryButton||undefined}
        hoverColor={categoryButton||undefined}
        >{children} 
         </ButtonLink>
    }
    if(isLoading) {
        return <Spinner />
    }
    return <Button
        data-active={active || undefined}
        data-keyButton={keyButton}
        style={style}
        onMouseDown={onMouseDown}
        color={categoryButton||undefined}
        hoverColor={categoryButton||undefined}
    >   
    {isLoading ?<Spinner /> : null}
    {icon?  <Icon tipText="KOKOKKO" glyph={icon} /> :  null}
    {children}
    </Button>
}
const ButtonLink = styled(StyledOutlineButton.withComponent(Link))`
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    white-space: nowrap;
    word-break: keep-all;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    position: relative;
    text-align: center;
    padding: 12px 16px;
    background-color: #7B16FF;
    background: transparent;
    background-image: none;
    font-weight: 600;
`