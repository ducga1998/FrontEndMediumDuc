import * as React from 'react';
import styled from 'styled-components';
import { StyledOutlineButton, StyledSolidButton, StyledTextButton, baseButton } from '../styled/button';
import Icon from '../Icon';
import { Spinner, fontStack } from '../styled/base';
import { Link } from 'react-router-dom';
interface IUIButton {
    width ?: string
    height ?:string
    children?: any
    onMouseDown?: (e: any) => void,
    style?: Object,
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
    console.log('categoryButton',categoryButton)
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
            >
        {children} 
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
    {icon?  <Icon  glyph={icon} /> :  null}
    {children}
    </Button>
}
const ButtonLink = styled(StyledOutlineButton.withComponent(Link))`
${baseButton}
${fontStack}
`