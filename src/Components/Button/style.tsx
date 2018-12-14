import styled from 'styled-components';


export const ButtonView = styled.a<any>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 8px;
  background-color: ${props => props.color ? props.color(props) : props.theme.brand.alt};
  ${props => props.disabled ? 'background-color: ${props.theme.bg.inactive};' : ''}
  ${props => props.size === 'large' ? ' padding: 16px 32px;' : null};
`;

export const ButtonText = styled('a') <any>`
  font-weight: 700;
  font-size: 15px;
  line-height: 21;
  color: ${props => props.theme.text.reverse};
  ${props => props.size === 'large' ? 'font-size: 18px;line-height: 18px;' : null}
  ${props => props.icon ? 'margin-left: 12px;' : null};
`;

export const ButtonIcon = styled.a`
  display: flex;
  height: 21px;
  align-items: center;
  justify-content: center;
`;
