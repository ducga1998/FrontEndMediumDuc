import * as React from 'react'
import styled from 'styled-components'
import UIWidget from './UIWidget';
import UIButton from './UIButton';
const { useEffect, useState } = React
interface IUIModal {
    trigger: any
    title?: string
    children?: any
    width?: string
    height?: string
}
export default function UIModal({ trigger, children, title, width, height }: IUIModal) {

    const [open, setOpen] = useState(false)
    const button = React.cloneElement(trigger, {
        onClick: () => {
            setOpen(!open)
        },
    })
    return <>{button} <UIWidget> <$Background onMouseDown={() => {
        setOpen(false)
    }} open={open}>
        <$Modal onMouseDown={(e: any) => {
            e.stopPropagation();
        }} >
            <$Header>{title ? title : 'Header Modal '}</$Header>
            <$Content height={height} width={width}> {children}</$Content>

            <$Footer>
                <UIButton width="100px" onChange={(e: any) => { e.stopPropagation(); setOpen(false) }}> Close </UIButton>
            </$Footer>
        </$Modal>

    </$Background>

    </UIWidget> </>

}
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
const $Background = styled.div<{ open: Boolean }>`
    top: 0px;
    left: 0px;
    z-index : 1;
    // pointer-events: initial;
	box-shadow: none;
	overflow: visible !important;
    position: absolute;
    width : 100%;
    height : 100%;
    display  : ${(props: any) => {
        const { open } = props;
        if (open) {
            return 'flex';
        }
        return 'none';
    }};
    align-items : center;
    justify-content : center;
    background: #0000005e;
`
const $Modal = styled.div<{ width?: string, height?: string }>`
display : flex;
flex-direction : column;
z-index : 10;
    width : ${(props: any) => props.width ? props.width : 'auto'};
    height: ${(props: any) => props.height ? props.height : 'auto'};
`