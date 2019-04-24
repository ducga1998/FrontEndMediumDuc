import * as React from 'react'
import styled from 'styled-components'
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
export default () => {
    return <WrapperToast>
        <ToastContainer
            toastClassName="dark-toast"
            transition={Zoom}
            autoClose={5000}
            className='md-toast-container' />
    </WrapperToast>
}
const WrapperToast = styled.div`
    /* .md-toast-container{
        padding : 20px;
    background : ${props => props.theme.bg.default};
    border-radius : 10px;
    }
    .dark-toast {
        border-radius : 10px;
    } */
`