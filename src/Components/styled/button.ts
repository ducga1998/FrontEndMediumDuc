// @flow
/* eslint no-eval: 0 */
// $FlowFixMe
import styled, { css } from 'styled-components';

import { Shadow, Transition, hexa } from '../styled/base';
import theme from '../../theme';
// css Base for all button 
// margin , padding,
const baseButton = css`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 700;
  white-space: nowrap;
  word-break: keep-all;
  transition: ${Transition.hover.off};
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  position: relative;
  text-align: center;
  padding: ${(props: any) => (props.icon ? '4px 8px 4px 4px' : '12px 16px')};
  &:hover {
    transition: ${Transition.hover.on};
    box-shadow: ${(props: any) =>
        props.disabled
            ? 'none'
            : `${Shadow.high} ${hexa(props.theme.bg.reverse, 0.15)}`};
    opacity: ${(props: any) => (props.disabled ? '0.5' : '1')};
  }
  /* if an icon and label are both present, add space around the label*/
  div + span,
  span + span {
    margin: 0 8px;
  }
  @media (min-width: 768px) {
    &[data-active~='true'] {
      box-shadow: inset 0 ${true ? '-2px' : '-4px'} 0
        ${theme.text.reverse};
      color: ${theme.text.reverse};
      transition: ${Transition.hover.on};
    background : ${props => props.theme.brand.dark};
      &:hover,
      &:focus {
        box-shadow: inset 0 ${true ? '-2px' : '-4px'} 0
          ${theme.text.reverse};
        transition: ${Transition.hover.on};
      }
    }

    &:hover,
    &:focus {
      box-shadow: inset 0 ${true ? '-2px' : '-4px'} 0
        ${({ theme }) =>
        process.env.NODE_ENV === 'production'
            ? theme.text.placeholder
            : theme.warn.border};
      /* color: ${theme.text.reverse}; */
      transition: ${Transition.hover.on};
    }
  }

  @media (max-width: 768px) {
    color: ${props =>
        process.env.NODE_ENV === 'production'
            ? props.theme.text.placeholder
            : props.theme.warn.border};
    padding: 0;
    grid-template-columns: 'auto';
    grid-template-rows: 'auto auto';
    grid-template-areas: 'icon' 'label';
    align-content: center;

    &[data-active~='true'] {
      color: ${theme.text.reverse};
      transition: ${Transition.hover.on};
    }
  }
`;

export const Label = styled.span`
  display: block;
  flex: 1 0 auto;
  line-height: inherit;
  color: inherit;
  ${(props: any) => (props.loading && !props.hasIcon ? 'opacity: 0;' : 'opacity: 1;')};
  align-self: center;
  margin: auto;
`;

export const StyledSolidButton = styled('button')<any>`
  ${baseButton}
  background-color: ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : eval(`props.theme.${props.color ? props.color : `brand.alt`}`)};
  color: ${(props: any) => props.theme.text.reverse};
  &:hover {
    background-color: ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : eval(
                `props.theme.${props.hoverColor ? props.hoverColor : 'brand.alt'}`
            )};
  }

  &:active {
    box-shadow: ${(props: any) =>
        props.disabled
            ? 'none'
            : `${Shadow.low} ${hexa(props.theme.bg.reverse, 0.15)}`};
  }
`;

export const StyledTextButton = styled(StyledSolidButton)`
  background: transparent;
  background-image: none;
  font-weight: 600;
  color: ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : eval(`props.theme.${props.color ? props.color : 'text.alt'}`)};
  transition: 'color 0.1s ease-out, box-shadow 0.2s ease-out 0.1s, border-radius 0.2s ease-out, padding: 0.2s ease-out';

  &:hover {
    background-color: transparent;
    box-shadow: none;
    color: ${(props: any) =>
        props.disabled
          ? props.theme.inactive
            : eval(
                `props.theme.${props.hoverColor ? props.hoverColor : 'brand.alt'}`
            )};
    transition: color 0.1s ease-in, box-shadow 0.2s ease-in 0.1s, padding 0.2s ease-in;
  }
`;

export const StyledOutlineButton = styled(StyledTextButton)`
  box-shadow: inset 0 0 0 2px ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : eval(`props.theme.${props.color ? props.color : 'brand.default'}`)};
  color: ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : eval(`props.theme.${props.color ? props.color : 'brand.default'}`)};
  transition: ${Transition.hover.on};
  
  &:hover {
    background-color: ${({ theme }) => theme.bg.default};
    color: ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : eval(
                `props.theme.${props.hoverColor ? props.hoverColor : 'brand.alt'}`
            )};
    box-shadow: inset 0 0 0 2px ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : eval(
                `props.theme.${props.hoverColor ? props.hoverColor : 'brand.alt'}`
            )};
    transition: ${Transition.hover.on};
  }
`;
export const StyledIconButton = styled.button`
  ${baseButton}
  padding: 0;
  width: 32px;
  height: 32px;
  background-color: transparent;
  color: ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : props.color
                ? eval(`props.theme.${props.color}`)
                : props.theme.text.alt};
  opacity: ${(props: any) => (props.opacity ? props.opacity : 1)};

  &:hover {
    color: ${(props: any) =>
        props.disabled
            ? props.theme.inactive
            : props.hoverColor
                ? eval(`props.theme.${props.hoverColor}`)
                : props.color
                    ? eval(`props.theme.${props.color}`)
                    : props.theme.brand.alt};
    transform: ${(props: any) => (props.disabled ? 'none' : 'scale(1.05)')};
    box-shadow: none;
    opacity: 1;
  }
`;

export const SpinnerContainer = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
`;
