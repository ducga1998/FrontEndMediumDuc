
import * as React from 'react'
import * as  ReactDOM from 'react-dom'
let zindex = 1
export default class UIWidget extends React.Component<any> {
    componentDidUpdate() {
        const dom = ReactDOM.findDOMNode(this) as HTMLElement
        console.log('dom', dom)
        if (!dom ) { return }
        console.log(' dom.style', dom.style)
        // dom.style.zIndex = `${zindex++}`;
    }
    render() {
        return ReactDOM.createPortal(this.props.children, this.props.dom ||document.body)

    }
}