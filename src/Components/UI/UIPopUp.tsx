
import * as React from 'react'
import { FlexCol, Transition , FlexRow } from '../styled/base';
import styled from 'styled-components';
import theme from '../../theme';
import UIWidget from './UIWidget';
import { OverLay } from '../styled/overlay';
const {useEffect , useState  ,useRef} = React
export default function UIPopUp({children , trigger }) {
    const [open , setOpen ] = useState(false)
    const refPopUp = useRef(null)
    const refTrigger = useRef(null) as any
    function updatePosition(){
        setOpen(!open)
        const domPopUp  = refPopUp.current as any
        if(refTrigger && domPopUp) {
            const {top ,left  , width , height} = refTrigger.current.getBoundingClientRect()
            const rectPopup = domPopUp.getBoundingClientRect()
            console.log('top '  , top,left)
            domPopUp.style.top = (top +height +10 ) + 'px';
            domPopUp.style.left = left + 'px'
             // 4 goc screen desktop 
            const  {innerHeight , innerWidth} = window
            if(left + width  > innerWidth){
                
                domPopUp.style.left = (left - rectPopup.width - 10) + 'px'
            }
        }
       
            console.log('refTrigger',refTrigger ,'domPopUp',domPopUp )
    }
   const Button  =  React.cloneElement(trigger , {
            onMouseDown : (event) => {
                event.stopPropagation()
                console.log(event.target)
                updatePosition()
            },
            ref : refTrigger,            
    })
    return <> {Button}  
  {open ?  <UIWidget>
        <Wrapper  onMouseDown={(event) => {  event.stopPropagation() }}> 
            <Popup ref={refPopUp}>
                {children}
            </Popup>
        </Wrapper>
       
   </UIWidget> : null} }</>
}
const Wrapper  = styled(OverLay)`
background-color: transparent;
display : flex;
`
const Popup = styled(FlexCol)`
    display : block;
    background-color : ${theme.bg.default};
    position: absolute;
    z-index: 21323;
    padding-top: 8px;
    color: ${theme.text.default};
    /* transition: ${Transition.dropdown.off}; */
`;