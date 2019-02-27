
import * as React from 'react'
import * as  ReactDOM from 'react-dom'

let refWPotarl = null
export const Portal  = () => <div ref={ (e : any) => refWPotarl = e} />
export default class UIWidget extends React.Component<any> {
    static zindex  =  0
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this) as any
        console.log('dom', dom)
        if (!dom  || typeof dom !== 'object' ||  !dom['style'] ) { return }
        console.log(' dom.style', dom)
        dom.style.zIndex = `${UIWidget.zindex++}`;
    }
    componentWillUnmount(){
       UIWidget.zindex --
    }
    render() {
        return ReactDOM.createPortal(this.props.children, refWPotarl || document.body)

    }
}