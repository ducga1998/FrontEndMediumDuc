import * as React from 'react';
import styled from 'styled-components';
import { StyledOutlineButton, StyledSolidButton, StyledTextButton } from '../styled/button';
import Icon from '../Icon';
import { Spinner } from '../styled/base';
interface IUIButton {
    width?: string
    height?: string
    children?: any
    onMouseDown?: (e: any) => any,
    style?: any,
    keyButton?: number,
    active?: boolean,
    icon ? :string
    category ?:'danger'| 'space' |'success'|'sidebar',
    isLoading ?: boolean,
    type ?: 'outline'| 'soild' |'text'
}
export default function UIButton({ type , 
    children, width, height, onMouseDown, style, keyButton, active, icon ,category, isLoading
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
    

    return <Button
        data-active={active || undefined}
        data-keyButton={keyButton}
        style={style}
        onMouseDown={onMouseDown}
        color={categoryButton||undefined}
        hoverColor={categoryButton||undefined}
    >   
    {isLoading ?<Spinner /> : null}
    {icon?  <Icon glyph={icon} /> :  null}
    {children}
    </Button>
}