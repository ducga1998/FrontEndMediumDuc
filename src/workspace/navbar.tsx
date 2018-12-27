import * as React from 'react'
import UIWidget from '../Components/UI/UIWidget';
import { OverLay } from '../Components/styled/overlay';
import styled from 'styled-components';
// import OverLay from './overlay';
export default  class NavBar extends React.Component<{open : boolean , setOpen: any}> {
    render() {
        return <>{this.props.open ? <UIWidget>
            <OverLayNavBar open onMouseDown={this.props.setOpen()} >
                cascnasjcnaksjncnajskncjkanskcnkasnjkc
            </OverLayNavBar>
        </UIWidget> : null}</> 
    }
}
const OverLayNavBar = styled(OverLay)`
    align-items : flex-start;
    justify-content :  initial;
`