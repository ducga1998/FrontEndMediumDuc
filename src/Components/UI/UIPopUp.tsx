
import * as React from 'react'
import { FlexCol, Transition  } from '../styled/base';
import styled from 'styled-components';
import theme from '../../theme';
import UIWidget from './UIWidget';
const {  useState  ,useRef} = React
interface IPopUp {
    children ?: any 
    trigger?:any
    width  ?:string
    height?:string
}
export default function UIPopup({children , trigger ,  width  , height }:IPopUp) {
    const [open , setOpen ] = useState(false)
    const refPopUp = useRef(null)
    function updatePosition(event){
        event.stopPropagation()
        const domButton = event.target
        const domPopUp  = refPopUp.current as any
        if(domButton && domPopUp) {
            let {top ,left  , width , height} = domButton.getBoundingClientRect()
            top  = top + height
            const rectPopup = domPopUp.getBoundingClientRect()
            setOpen(!open)
            const  {innerHeight , innerWidth} = window
            // domPopUp.style.width = (width - 10) + 'px'
            if(top  +rectPopup.height > innerHeight  && left + width > innerWidth ){
                console.log('TH1')
                domPopUp.style.top = (top  - rectPopup.height -10) + 'px'
                domPopUp.style.left = (left - rectPopup.width - 10) + 'px'
            }
            //  top - right
            else if (left + rectPopup.width  > innerWidth){
                console.log('TH2')
                domPopUp.style.top = top + 'px'
                domPopUp.style.left = (left - rectPopup.width - 10) + 'px'
               
            }
            // top - left
            else if(left - rectPopup.width  < 0  ){
                console.log('TH3')
                domPopUp.style.top = top + 'px'
                domPopUp.style.left = (left + rectPopup.width + 10 ) + 'px'
               
            }
            //bottom + right
            else if(top + rectPopup.height > innerHeight ){
                console.log('TH4')
                domPopUp.style.top = (top  - rectPopup.height -10) + 'px'
                domPopUp.style.left = left + 'px'
               
            }
            else {
                domPopUp.style.top = top  + 'px'
                domPopUp.style.left = left + 'px'
            }
        }
    
    }
   const Button  =  React.cloneElement(trigger , {
        onMouseDown :  updatePosition ,   
        style : { zIndex : 9090 }        
    })
    return <> {Button}  
            {<UIWidget>
                <Wrapper open={open} data-off="true" onMouseDown={(event) => {  event.stopPropagation() ; console.log(event.target); 
                    
                    if(event.target && event.target.getAttribute('data-off')){
                            setOpen(false)
                        }
                }} > 
                    <Popup  ref={refPopUp} width={width} height={height}>
                        {children}
                    </Popup>
                </Wrapper>
            
        </UIWidget> 
        }
    </>
}
const Wrapper  = styled.div<any>`
 
 visibility : ${props => props.open? 'visible' : 'hidden'};
 
 position : absolute;
 width : 100%;
 height  :100%;
 background-color : transparent;
 top : 0px;
 left : 0px;
`
const Popup = styled(FlexCol)<any>`
    width: ${props => props.width};
    height :${props => props.height};
    display : block;
    background-color : ${theme.bg.default};
    position: absolute;
    z-index: 21323;
    color: ${theme.text.default};
    /* transition: ${Transition.dropdown.off}; */
`;