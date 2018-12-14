
import * as React from 'react'
import * as  ReactDOM from 'react-dom'
export default class UIWidget extends React.Component<any> {

    render() {
        return ReactDOM.createPortal(this.props.children, document.body)

    }
}