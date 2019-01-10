import * as React from 'react';
import styled from 'styled-components';


import theme from '../../theme';
import UIWidget from './UIWidget';
import UIButton from './UIButton';
import { OverLay } from '../styled/overlay';
import { H1 } from '../styled/base';
// const { useEffect, useState } = React
interface IUIModal {
    trigger?: any
    title?: string
    children?: any
    width?: string
    height?: string,
    closeMoDal: () => any,
    openModal: () => any,
    open: boolean,
    onClickOutSide: () => any
}
export default function     UIModal({ trigger, children, title, width, height, closeMoDal, openModal, open, onClickOutSide }: IUIModal) {
    let button 
    if(trigger){
         button = React.cloneElement(trigger, {
            onClick: () => {
                openModal()
            },
        })
    }
    return <>{button?button : null} <UIWidget> <$Background onMouseDown={onClickOutSide} open={open}>
        <$Modal onMouseDown={(e: any) => {
            e.stopPropagation();
        }} >
            <$Header><H1>{title ? title : 'Header Modal '}</H1></$Header>
            <$Content height={height} width={width}> {children}</$Content>

           
        </$Modal>
    </$Background>
    </UIWidget> </>
}
const $Background = styled(OverLay)``
const $Header = styled.header`
    background-color: ${props => props.theme.space.default};
    padding: 10px;
    display: flex;
    align-items: center;
    height: 100px;

`

const $Footer = styled.div`
display : flex;
justify-content : flex-end;
background-color : ${props => props.theme.bg.default};
border-top: 1px solid black;
padding: 10px;
`

const $Content = styled.div<{ height?: string, width?: string }>`
    padding : 10px;
    height : ${props => props.height ? props.height : 'auto'};
    width : ${props => props.width ? props.width : 'auto'};
    background-color: ${theme.bg.default};
`
const $Modal = styled.div<{ width?: string, height?: string }>`
display : flex;
flex-direction : column;
z-index : 10;
    width : ${(props: any) => props.width ? props.width : 'auto'};
    height: ${(props: any) => props.height ? props.height : 'auto'};
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 1px 2px 50px -12px;
    overflow: hidden;
`