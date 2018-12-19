


import * as React from 'react';
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
  border-bottom : 2px solid ${props => props.theme.bg.hairline};
  flex: none;
  + div,
  + span {

    @media (max-width: 768px) {
      margin-top: 2px;
    }
  }

  @media (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
  }
  &:focus {
    background-color : ${props => props.theme.bg.hairline}
  } 
`


export default StyledCard;
