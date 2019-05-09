
import styled, { css, ThemedStyledProps } from 'styled-components';
import { Transition, Shadow, zIndex, hexa } from '../styled/base';
import theme, { ThemeType } from '../../theme';
import { DetailedHTMLProps, HTMLAttributes } from 'react';


export const Wrapper = styled.div`
  display: inline-block;

  ${(props: {darkContext ?: boolean}) =>
        props.darkContext &&
        css`
      > button {
        color: ${theme.text.reverse};
        /* transition: ${Transition.hover.off}; */

        &:hover {
          color: ${theme.text.reverse};
          transform: scale(1.1);
          transition: ${Transition.hover.on};
        }
      }
    `};
`;

