import * as React from 'react';
import styled from 'styled-components';
import { StyledOutlineButton } from '../styled/button';
import Icon from '../Icon';
interface IUIButton {
    width?: string
    height?: string
    children?: any
    onMouseDown?: (e: any) => any,
    style?: any,
    keyButton?: number,
    active?: boolean,
    icon ? :string
    category ?:'danger'| 'space' |'success',
    // isLoading : boolean,
}
export default function UIButton({
    children, width, height, onMouseDown, style, keyButton, active, icon ,category
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
            break;
    
        default:
            break;
    }
    return <StyledOutlineButton
        data-active={active || undefined}
        data-keyButton={keyButton}
        style={style}
        onMouseDown={onMouseDown}
        color={categoryButton||undefined}
        hoverColor={categoryButton||undefined}
    >   
    
    {icon?  <Icon glyph={icon} /> :  null}
    {children}
    </StyledOutlineButton>
}