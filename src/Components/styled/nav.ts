// import { theme } from './../../theme/index';
import Link from '../Link';
// @flow
import styled, { css } from 'styled-components';
import { FlexRow, hexa, fontStack, Transition } from './base';
 //  have

export const Nav = styled(FlexRow)`
  width: 100%;
  background: ${({ theme }) =>theme.text.default };
  display: flex;
  align-items: stretch;
  color: ${({ theme }) => theme.text.reverse};
  justify-content: space-between;
  flex: 0 0 48px;

  line-height: 1;
  box-shadow: 0 4px 8px ${({ theme }) => hexa(theme.bg.reverse, 0.15)};
  z-index: 3;

  @media (max-width: 768px) {
    padding: 0;
    order: 3;
    position: relative;
    box-shadow: 0 -4px 8px ${({ theme }) => hexa(theme.bg.reverse, 0.15)};
    display: none;
  }
`;

export const Section = styled(FlexRow) <any>`
  align-items: stretch;
  display: ${props => (props.hideOnDesktop ? 'none' : 'flex')};
  @media (max-width: 768px) {
    flex: auto;
    justify-content: space-around;
    display: ${props => (props.hideOnMobile ? 'none' : 'flex')};
  }
`;

export const LogoLink = styled(Link)`
  color : ${props => props.theme.text.reverse};
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:after {
        margin-top: 4px;
        font-size: 0.75em;
      }
`;

export const Logo = styled.img`
  width: 16px;
  height: 16px;
  align-self: center;
  position: relative;
  top: 1px;
  left: 1px;
`;

export const IconLink = styled(Link)`
  ${fontStack}
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  margin: 0 8px;
  padding: 0 8px;
  opacity: 0.8;
  position: relative;
  width: 100%;
  color : ${props => props.theme.text.reverse};
  /* transition : ${Transition.hover.off}; */
  &:hover {
    opacity: 1;
    box-shadow: inset 0 -4px 0 ${({ theme }) => theme.bg.default};
    transition : ${Transition.hover.on};
  }

  ${/* handles unseen notification counts for both DMs and Notifications */ ''} ${(props: any) =>
        props.withCount &&
        css`
        > .icon:after {
          content: ${props.withCount ? `'${props.withCount}'` : `''`};
          position: absolute;
          left: calc(100% - 12px);
          top: -2px;
          font-size: 20px;
          font-weight: 600;
          background: ${({ theme }) => theme.bg.default};
          color: ${({ theme }) =>theme.text.default}
             
          border-radius: 8px;
          padding: 2px 4px;
          border: 2px solid ${({ theme }) =>theme.text.default}
               
      `} &[data-active~='true'] {
    box-shadow: inset 0 -4px 0 ${({ theme }) => theme.bg.default};
    opacity: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    opacity: 0.7;
    margin: 0;

    &[data-active~='true'] {
      box-shadow: inset 0 0 0 ${({ theme }) => theme.bg.default};
      opacity: 1;
    }

    div {
      width: 32px;
      height: 32px;
    }
  }
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 700;
  margin-left: 12px;

  @media (max-width: 768px) {
    font-size: 9px;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 2px;
    margin-left: 0;
  }

  @media (max-width: 360px) {
    display: none;
  }
`;
