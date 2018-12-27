import styled from 'styled-components';

export const AvatarImage = styled.img<{ plan ?: boolean , radius ?: number ,sizeBorder ?: string , size ?: number}>`
  background-color: transparent;
  width: ${props => (props.size ? `${props.size}px` : '30px')};
  height: ${props => (props.size ? `${props.size}px` : '30px')};
  border-radius: 50%;
        border : ${props => props.sizeBorder? props.sizeBorder : '5px'} solid ${props => props.theme.bg.reverse};
        &:hover {
          border : ${props => props.sizeBorder? props.sizeBorder : '5px'} solid ${props => props.theme.brand.default};
        }
        transition : .2s;
       ${props => props.plan ?  'margin : 4px' : ''} 
`;

