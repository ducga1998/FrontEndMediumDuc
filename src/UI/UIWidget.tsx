import * as React from 'react'
import * as  ReactDOM from 'react-dom'

export const UIWidget: React.FunctionComponent = props => {
    return ReactDOM.createPortal(props.children, document.body);
}
