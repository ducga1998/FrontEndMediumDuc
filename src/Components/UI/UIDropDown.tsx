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

const DropdownPure = (props) => (
  <StyledDropdown className={'dropdown'} {...props}>
    <StyledCard>{props.children}</StyledCard>
  </StyledDropdown>
);

export const Dropdown = compose()(DropdownPure);
export default Dropdown;
