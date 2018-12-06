

import *  as React from 'react'
import userContainer from '../Container/userContainer';
import { Glyphicon } from 'react-bootstrap';
import UIInput from './UIInput';
import UIButton from './UIButton';
import styled from 'styled-components';

const { useState, useRef } = React
interface IUIEditer {
    info: string,
    content: string
}
export default function UIEditer({ info, content }: IUIEditer) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(content)
    const inputref = useRef(null) as any
    const handleMousuOut = () => {
        console.log('out')
    }
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
    return <div><h3 onClick={(e: any) => { setOpen(!open); }} ><b>{info} : </b>{(value ? value : '')}
        <Glyphicon glyph="edit" /></h3>
        {open ? <$Flex>
            <UIInput onKeyPress={handleOnPress} style={{ width: '100%' }} refInput={inputref} onChange={() => { }} placeholder={info} />
            <UIButton style={{ "margin-left": "20px" }} onChange={handleOnClick}>Edit</UIButton>
        </$Flex> : null}
    </div>

}
const $Flex = styled.div`
    display : flex;
`