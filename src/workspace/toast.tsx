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
 .md-toast-container{
      z-index : 99999999999999999999999;
      border-radius   : 20px;
      
    }   
`