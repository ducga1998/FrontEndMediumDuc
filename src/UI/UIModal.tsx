import * as React from 'react';
import styled from 'styled-components';
import UIButton from './UIButton';
import UIWidget from './UIWidget';
import { OverLay } from '../UI/styled/overlay';
// const { useEffect, useState } = React
interface IUIModal {
    trigger: any
    title?: string
    children?: any
    width?: string
    height?: string,
    closeMoDal: () => any,
    openModal: () => any,
    open: boolean,
    onClickOutSide: () => any
}
export default function UIModal({ trigger, children, title, width, height, closeMoDal, openModal, open, onClickOutSide }: IUIModal) {
    const button = React.cloneElement(trigger, {
        onClick: () => {
            openModal()
        },
    })
    return <>{button} <UIWidget> <$Background onMouseDown={onClickOutSide} open={open}>
        <$Modal onMouseDown={(e: any) => {
            e.stopPropagation();
        }} >
            <$Header>{title ? title : 'Header Modal '}</$Header>
            <$Content height={height} width={width}> {children}</$Content>

            <$Footer>
                <UIButton width="100px" onMouseDown={(e: any) => { e.stopPropagation(); closeMoDal() }}> Close </UIButton>
            </$Footer>
        </$Modal>
    </$Background>
    </UIWidget> </>
}
const $Background = styled(OverLay)``
const $Header = styled.div`
    background-color: #57aff5;
    font-size: 25px;
    padding: 10px;
    display: flex;
    align-items: center;
    height: 100px;

`
const $Footer = styled.div`
display : flex;
justify-content : flex-end;
background-color : white;
border-top: 1px solid black;
padding: 10px;
`
const $Content = styled.div<{ height?: string, width?: string }>`
    padding : 10px;
    height : ${props => props.height ? props.height : '500px'};
    width : ${props => props.width ? props.width : 'auto'};
    background-color: white;
`

const $Modal = styled.div<{ width?: string, height?: string }>`
display : flex;
flex-direction : column;
z-index : 10;
    width : ${(props: any) => props.width ? props.width : 'auto'};
    height: ${(props: any) => props.height ? props.height : 'auto'};
`