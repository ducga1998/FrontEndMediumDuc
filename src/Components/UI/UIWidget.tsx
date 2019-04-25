
import * as React from 'react'
import * as  ReactDOM from 'react-dom'
import styled from 'styled-components';

let refWPotarl  : any
export const Portal  = () => <OverLay ref={ (e : any) => refWPotarl = e} />
 
export default class UIWidget extends React.Component<any> {
    static zindex  =  1000
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this) as any
        
        if (!dom  || typeof dom !== 'object' ||  !dom['style'] ) { return }
        dom.style.zIndex = UIWidget.zindex++
    }
    componentWillUnmount(){
       UIWidget.zindex --
    }
    render() {
        return ReactDOM.createPortal(this.props.children,  document.getElementById('pb-duc-modal-render') as any) 

    }
}
const OverLay = styled.div`
position : relative;
width : 100%;
height : 100%;
`