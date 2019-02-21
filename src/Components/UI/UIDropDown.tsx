
import * as  React from 'react';
import styled from 'styled-components';
import Card from '../styled/card';
import { Shadow, FlexCol, hexa, Transition } from '../styled/base';
import theme from '../../theme';


const StyledDropdown = styled(FlexCol)`
  background-color: transparent;
  position: absolute;
  display : block;
  width: auto;
  top: 0px;
  opacity : 0;
  right: 0px;
  z-index: 21323;
  padding-top: 8px;
  color: ${theme.text.default};
  transition: ${Transition.dropdown.off};
`;
// card is notification 
const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  box-shadow: ${Shadow.high} ${({ theme }) => hexa(theme.bg.reverse, 0.15)};
  max-height: 640px;
  overflow: hidden;
  align-items: stretch;
  display: inline-block;
  border-radius: 8px;
`;

interface IUIDropDown {
  trigger: any,
  children: any
}
export default class UIDropDown extends React.Component<IUIDropDown> {
  refDropDown  : any  = React.createRef()
  state  = {
    open : false
  }
  handleViewDropDown= (event) => {
      const domDropDown = this.refDropDown.current
      this.setState({open : true})
  }
  
  render() {
    const { trigger, children } = this.props
    const Button =  React.cloneElement(trigger, {
      onMouseDown: (event) => {
        this.handleViewDropDown(event)
      }
    })
    return <><Wrapper> {Button}{this.state.open? <StyledDropdown >{children}</StyledDropdown> : null}</Wrapper></>
  }


}
const Wrapper = styled.div`
position : relative;

`