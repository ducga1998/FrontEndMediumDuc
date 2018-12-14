


import * as React from 'react';
// $FlowFixMe
import compose from 'recompose/compose';
// $FlowFixMe
import styled from 'styled-components';
import { FlexCol } from './base';




function CardPure(props) {
  return <StyledCard {...props}>{props.children}</StyledCard>
}

export const StyledCard = styled(FlexCol) <any>`
  background: ${props => props.theme.bg.default};
  position: relative;
  width: 100%;
  max-width: 100%;
  background-clip: padding-box;
  overflow: visible;
  flex: none;
  + div,
  + span {
    margin-top: 16px;

    @media (max-width: 768px) {
      margin-top: 2px;
    }
  }

  @media (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
  }
`

export const Card = compose()(CardPure);
export default Card;
