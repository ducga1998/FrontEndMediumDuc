

import *  as React from 'react'
import styled from 'styled-components';
import userContainer from '../../Container/userContainer';
import UIButton from './UIButton';
import UIInput from './UIInput';
import { H3, baseHover } from '../styled/base';
// import { InputType } from 'types/input';

const { useState, useRef } = React
interface IUIEditer {
    info: string,
    content: string
    onUpdateProfile: (value: string) => void
}
export default function UIEditer({ info, content, onUpdateProfile }: IUIEditer) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(content)
    const inputref = useRef(null) as any;
    React.useEffect(() => {
        if (inputref && inputref.current) {
            inputref.current.value = (value ? value : '')
        }
    })
    React.useEffect(() => {
        setValue(content)
    }, [content])
    async function handleOnClick() {
        if (inputref.current) {
            setValue(inputref.current.value)
            setOpen(false)
            // onUpdateProfile()
            onUpdateProfile(inputref.current.value)

        }
    }
    function handleOnPress(event) {
        console.log(event.charCode)
        if (event.charCode === 13) {
            handleOnClick()
        }
    }
    return <div>
        <Propety onClick={(e: any) => { setOpen(!open); }} ><b>{info} : </b>{(value ? value : '')}
            {
                open && <$Flex>
                    <UIInput autoFocus onKeyPress={handleOnPress} refInput={inputref} onChange={() => { }} placeholder={info} />
                    <UIButton style={{ "margin-left": "20px" }} onMouseDown={handleOnClick}>Edit</UIButton>
                </$Flex>
            }
        </Propety>
    </div>

};
const $Flex = styled.div`
    display : flex;
`
const Propety = styled(H3)`
    cursor : pointer;
    padding : 10px;
    &:first-letter{
        /* font-size  :30px; */
        font-display : uppcase;
        text-transform: uppercase;
    }
    &:hover {
        ${baseHover}
    }
`