
import * as React from 'react';
import styled from 'styled-components';
export default class UITooltip extends React.Component<any> {
    refToolTip: any = React.createRef()
    handleMouseDown = (e) => {
        // console.log(e)
    }
    handleMouseOver = (e) => {
        // console.log(e.target)
        const dom = e.target

        if (dom.getAttribute('data-tooltip')) {
            const text = dom.getAttribute('data-tooltip')
            const domToolTip = this.refToolTip.current
            // console.log(domToolTip, text)
            domToolTip.innerHTML = text
            const { top, left } = dom.getBoundingClientRect()

            // console.log('cascnkj', width)
            domToolTip.style.display = "inline-block"
            const { width } = domToolTip.getBoundingClientRect()
            domToolTip.style.left = `${left - (width / 2)}px`;
            domToolTip.style.top = `${top - 40}px`
        }
    }
    handleMouseLeave = (e) => {
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
background-color: #1b1a1a;
    color: white;
    position: absolute;
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
    display : none;
`