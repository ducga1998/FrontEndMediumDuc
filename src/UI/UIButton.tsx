import * as React from 'react';
import styled from 'styled-components';

interface IUIButtonProps {
    width?: string
    height?: string
    children?: any
    onChange?: (e: any) => any
}

export const UIButton: React.FunctionComponent<IUIButtonProps> = props => {
    return <$Primary onMouseDown={props.onChange} width={props.width} height={props.height}>{props.children}</$Primary>
};

const $Button = styled.a<{ width?: string, height?: string }>`
    width : ${props => props.width ? props.width : 'auto'};
    height: ${props => props.height ? props.height : 'auto'};
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;

    font-size: 1.4rem;
    border-radius: 3px;
    border: 1px solid transparent;
    text-decoration: none;
    user-select: none;
    box-shadow: inset 0 0 0 2px;
    font-weight: 600;
    border-radius: 12px;
    font-weight: 700;
    white-space: nowrap;
    word-break: keep-all;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    position: relative;
    text-align: center;
    padding : 12px 16px;
    &:hover  {
        text-decoration: none;
        box-shadow: 0px 0px 12px 2px #96bee0e0;
    }

`
const $Primary = styled($Button)`
    color: #e3f2fd;
    border-color: #1e88e5;
    background: linear-gradient(to bottom, #64b5f6 0%, #42a5f5 100%);
    box-shadow: inset 0 1px #bbdefb, 0 1px 2px rgba(0, 0, 0, 0.2);
`