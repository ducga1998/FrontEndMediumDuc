
import * as React from 'react'
import * as  ReactDOM from 'react-dom'
import styled from 'styled-components';

let refWPotarl  : HTMLElement | null
export const Portal  = () => <OverLay ref={ (e : any) => refWPotarl = e} />
 
export default class UIWidget extends React.Component {
    static zindex  : number =  1000
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this) as (HTMLElement | null| undefined)
        
        if (!dom  || typeof dom !== 'object' ||  !dom['style'] ) { return }
        dom.style.zIndex = UIWidget.zindex++ + ''
    }
    componentWillUnmount(){
       UIWidget.zindex --
    }
    render() {
        return ReactDOM.createPortal(this.props.children,  document.body) 

    }
}
const OverLay = styled.div`
position : relative;
width : 100%;
height : 100%;
`