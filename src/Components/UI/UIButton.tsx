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
}
export default function UIButton({
    children, width, height, onMouseDown, style, keyButton, active, icon
}: IUIButton) {
    return <StyledOutlineButton
        data-active={active || undefined}
        data-keyButton={keyButton}
        style={style}
        onMouseDown={onMouseDown}

    >   
    {icon?  <Icon glyph={icon} /> :  null}
    {children}
    </StyledOutlineButton>
}