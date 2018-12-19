

import *  as React from 'react'

import { Glyphicon } from 'react-bootstrap';

import styled from 'styled-components';
import userContainer from '../../Container/userContainer';
import UIButton from './UIButton';
import UIInput from './UIInput';
import { H3 } from '../styled/base';

const { useState, useRef } = React
interface IUIEditer {
    info: string,
    content: string
}
export default function UIEditer({ info, content }: IUIEditer) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(content)
    const inputref = useRef(null) as any
    React.useEffect(() => {
        // setValue(content)
        if (inputref.current) {
            inputref.current.value = (value ? value : '')
        }
    })
    async function handleOnClick() {
        if (inputref.current) {
            setValue(inputref.current.value)
            setOpen(false)
            userContainer.updateProfile({ [info]: inputref.current.value })
        }
    }
    function handleOnPress(event) {
        console.log(event.charCode)
        if (event.charCode === 13) {
            handleOnClick()
        }
    }
    return <div><H3 onClick={(e: any) => { setOpen(!open); }} ><b>{info} : </b>{(value ? value : '')}
        <Glyphicon glyph="edit" /></H3>
        {open ? <$Flex>
            <UIInput autoFocus onKeyPress={handleOnPress} style={{ width: '100%' }} refInput={inputref} onChange={() => { }} placeholder={info} />
            <UIButton style={{ "margin-left": "20px" }} onMouseDown={handleOnClick}>Edit</UIButton>
        </$Flex> : null}
    </div>

}
const $Flex = styled.div`
    display : flex;
`