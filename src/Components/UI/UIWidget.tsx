
import * as React from 'react'
import * as  ReactDOM from 'react-dom'
export default class UIWidget extends React.Component<any> {
    componentDidUpdate() {
    const dom =  ReactDOM.findDOMNode(this)

    }
    render() {
        return ReactDOM.createPortal(this.props.children, document.body)

    }
}