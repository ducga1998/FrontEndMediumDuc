import * as React from 'react';
import styled from 'styled-components';
function findDomToolTip(count , dom) : any{
    if(count  > 3 || !dom){
        return  null
    }
    if(dom && dom.getAttribute('data-tooltip')){
        return dom
    }
    return findDomToolTip(count , dom.parentElement)
} 
export default class UITooltip extends React.Component {
    refToolTip: any 
    handleMouseOver = (e) => {
       e.preventDefault()
        let count = 0
        let dom = findDomToolTip(count , e.target) as HTMLElement ;
        if (dom && dom.getAttribute('data-tooltip') && this.refToolTip) {
            const text = dom.getAttribute('data-tooltip')
            const domToolTip = this.refToolTip 
            domToolTip.innerHTML = text
            if(!domToolTip ) return
            const { top, left } = dom.getBoundingClientRect() as ClientRect
            // const view : any = dom.ownerDocument.defaultView  
            // const scrollTop = view.scrollY 
            domToolTip.style.display = "inline-block"
            let leftTooltip  =   left  
            const widthToolTip = domToolTip.getBoundingClientRect().width
            const heightToolTip = domToolTip.getBoundingClientRect().height
            let topTooltip = top  -  heightToolTip - 5  ;
            if( left + widthToolTip  > window.innerWidth ) {
              
                leftTooltip = left - widthToolTip -25 ;   
            }
            domToolTip.style.top = topTooltip  + 'px'
            domToolTip.style.left = leftTooltip +'px'
           
        }
    }
    handleMouseLeave = (e) => {

        e.stopPropagation()

        const domToolTip = this.refToolTip
        domToolTip.style.display = "none"
    }
    render() {
        return <div
        
            onMouseOverCapture={this.handleMouseOver}
            onMouseOutCapture={this.handleMouseLeave}
        >
         <$ToolTip ref={ e => this.refToolTip  = e}  />
            {this.props.children}
        </div>
    }
}

const $ToolTip = styled.div`
    z-index : 999999999999999;
    background-color: #1b1a1a;
    color: white;
    position: absolute;
    padding: 10px;
    border-radius: 10px;
    display : flex;
    width  : auto;
    pointer-events : none;
`