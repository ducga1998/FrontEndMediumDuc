
import * as React from 'react';
import styled from 'styled-components';
function findDomToolTip(count , dom){
    if(count  > 5 || !dom){
        return  null
    }
    if(dom && dom.getAttribute('data-tooltip')){
        return dom
    }
    return findDomToolTip(count , dom.parentElement)
}
export default class UITooltip extends React.Component<any> {
    refToolTip: any = React.createRef()
    handleMouseDown = (e) => {
    }
    handleMouseOver = (e) => {
       e.preventDefault()
        let count = 0
        let dom = findDomToolTip(count , e.target) as HTMLElement ||null
        if (dom && dom.getAttribute('data-tooltip')) {
            const text = dom.getAttribute('data-tooltip')
            dom.scroll
            const domToolTip = this.refToolTip.current
            // console.log(domToolTip, text)
            domToolTip.innerHTML = text
            const { top, left, height, width } = dom.getBoundingClientRect()
            const view = dom.ownerDocument.defaultView
            const scrollTop = view.scrollY
            // console.log('cascnkj', width)
            domToolTip.style.display = "inline-block"
            const widthToolTip = domToolTip.getBoundingClientRect().width
            domToolTip.style.left = `${left + width / 2 - (widthToolTip / 2)}px`;
            domToolTip.style.top = `${top - 30 + scrollTop}px`
        }
    }
    handleMouseLeave = (e) => {

        e.stopPropagation()
        const domToolTip = this.refToolTip.current
        domToolTip.style.display = "none"
    }
    render() {
        return <div onMouseDownCapture={this.handleMouseDown}
            onMouseOverCapture={this.handleMouseOver}
            onMouseOutCapture={this.handleMouseLeave}
        >
            <$ToolTip ref={this.refToolTip} />
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
    display : none;
`