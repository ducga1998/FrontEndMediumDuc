import * as React from 'react';
import styled from 'styled-components';
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
    return <$Primary
        data-active={active || undefined}
        data-keyButton={keyButton}
        style={style}
        onMouseDown={onMouseDown}
        width={width}
        height={height}>{children}
    </$Primary>
}
const $Button = styled.a<any>`
    width : ${props => props.width ? props.width : 'auto'};
    height: ${props => props.height ? props.height : 'auto'};
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    background-image: none;
    padding : 15px 20px;
    border-radius: 3px;
    border: 1px solid transparent;
    text-decoration: none;
    user-select: none;
    box-shadow: inset 0 0 0 2px;
    font-weight: 700;
    white-space: nowrap;
    word-break: keep-all;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    position: relative;
    &:hover  {
        text-decoration: none;
        box-shadow: 0px 0px 12px 2px #96bee0e0;
    }
    &[data-active] {
        border-color: #1e4a70;
        background: linear-gradient(to bottom,#375870 0%,#1d4364);
        color : white;
    }
`
const $Primary = styled($Button)`
    color: #e3f2fd;
    border-color: #1e88e5;
    transition : .3s; 
    background: linear-gradient(to bottom, #64b5f6 0%, #42a5f5 100%);
    box-shadow: inset 0 1px #bbdefb, 0 1px 2px rgba(0, 0, 0, 0.2);
`