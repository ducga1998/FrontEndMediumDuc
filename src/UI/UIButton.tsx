import * as React from 'react'
import styled from 'styled-components'
interface IUIButton {
    width?: string
    height?: string
    children?: any
    onChange?: (e: any) => any
}
export default function UIButton({
    children, width, height, onChange
}: IUIButton) {
    return <$Primary onMouseDown={onChange} width={width} height={height}>{children}</$Primary>
}
const $Button = styled.a<{ width?: string, height?: string }>`
    width : ${props => props.width ? props.width : 'auto'};
    height: ${props => props.height ? props.height : '30px'};
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 1.4rem;
    border-radius: 3px;
    border: 1px solid transparent;
    text-decoration: none;
    user-select: none;

`
const $Primary = styled($Button)`
    color: #e3f2fd;
    border-color: #1e88e5;
    background: linear-gradient(to bottom, #64b5f6 0%, #42a5f5 100%);
    box-shadow: inset 0 1px #bbdefb, 0 1px 2px rgba(0, 0, 0, 0.2);
`