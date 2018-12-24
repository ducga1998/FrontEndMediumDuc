import * as React from 'react'
import styled from 'styled-components';
import UIWidget from '../Components/UI/UIWidget';
// import { Input } from '../Components/styled/base';

export default function OverLay({getRef , imgSrc}  ) {
    const refOverLay = React.useRef(null) 
    const [state , setState]  = React.useState([ 0 , 0 , 0 ,0]) 
    function handleMouseDown(event){
        const arrtrEvent = event.target.getAttribute('data-event')
        console.log('arrtrEvent',arrtrEvent)
        console.log(imgSrc)
        const domImg  = document.querySelectorAll('[src="'+imgSrc+'"]')[0] as any
        if(domImg){
            switch (arrtrEvent){
                case 'Center' : 
                if(state[0]){
                    state[0] = 0
                    setState(state)
                    domImg.parentNode.style.textAlign = ''
                    break
                }
                setState( [1, 0 , 0 , 0])
                domImg.parentNode.style.textAlign = 'center'
                break
                // domImg.style.
                case 'Left' : 
                if(state[1]){
                    state[1] = 0
                    setState(state)
                    domImg.parentNode.style.textAlign = ''
                    break
                }

                setState( [0, 1 , 0 , 0])
                domImg.parentNode.style.textAlign = 'left'
                break
                case 'Right' : 
                if(state[2]){
                    state[2] = 0
                    setState(state)
                    domImg.parentNode.style.textAlign = ''
                    break
                }
                setState( [0, 0 , 1 , 0])
                domImg.parentNode.style.textAlign = 'right'
                break
                case 'Full' : 
                if(state[3]){
                    state[3] = 0
                    setState(state)
                    domImg.style.width = ''
                    break
                }
                setState( [0, 0 , 0 , 1])
                domImg.style.width = '100%'
                break
            }
            
        }
      
        
    }
 return <UIWidget><Wrapper onMouseDown = {e => e.stopPropagation()} ref={(ref) => {getRef(ref)}}>
            <Full>
                <Input>
                    {['Left', 'Center', 'Full', 'Right'].map(item => {
                        return <button data-event ={item} onMouseDown={handleMouseDown}>{item}</button>
                    })}
                </Input>
            </Full>
            
 </Wrapper></UIWidget>
    
}
const Wrapper  =  styled.div`
position : absolute;
z-index : 22;
border : 3px solid ${props => props.theme.brand.default};
`
const Full  = styled.div`
    width : 100%;
    height : 100%;
    position : relative;
`
const Input = styled.div`
display : flex;
justify-content : flex-end;
position : absolute;
width : 50%;
transform : translateX(25%);
`