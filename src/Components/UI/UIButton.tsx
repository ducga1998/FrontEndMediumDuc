import * as React from 'react';
import styled from 'styled-components';
import { StyledOutlineButton } from '../styled/button';
interface IUIButton {
    width?: string
    height?: string
    children?: any
    onMouseDown?: (e: any) => any,
    style?: any,
    keyButton?: number,
    active?: boolean
}
export default function UIButton({
    children, width, height, onMouseDown, style, keyButton, active
}: IUIButton) {
    return <StyledOutlineButton

        data-active={active || undefined}
        data-keyButton={keyButton}
        style={style}
        onMouseDown={onMouseDown}

    >{children}
    </StyledOutlineButton>
}