import styled from 'styled-components';

export const AvatarImage = styled.img<any>`
  background-color: transparent;
  width: ${props => (props.size ? `${props.size}px` : '30px')};
  height: ${props => (props.size ? `${props.size}px` : '30px')};
  border-radius: ${props =>
        props.radius ? `${props.radius}px` : `${props.size / 2}px`};
        border : 6px solid ${props => props.theme.bg.reverse};
        &:hover {
          border : 6px solid ${props => props.theme.brand.default};
        }
        transition : .2s;
        
`;

