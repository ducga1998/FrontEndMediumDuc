// @flow

import * as  React from 'react';
// $FlowFixMe
import compose from 'recompose/compose';
// $FlowFixMe
import styled from 'styled-components';
// import { } from '';
import Card from '../styled/card';
import { Shadow, FlexCol, hexa, Transition } from '../styled/base';
import theme from '../../theme';
import { AnyNaptrRecord } from 'dns';


const StyledDropdown = styled(FlexCol)`
  background-color: transparent;
  position: absolute;
  width: 400px;
  top: 100%;
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

  render() {
    const { trigger, children } = this.props
    React.cloneElement(trigger, {
      onMouseDown: () => {
        console.log('test')
      }
    })
    return <div>  <StyledDropdown>{children}</StyledDropdown></div>
  }


}