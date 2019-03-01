import * as React from 'react';

import Navigation from './Header/Navigation/navbar';
import styled from 'styled-components';
import NavBar from '../workspace/navbar';
import userContainer from '../Container/userContainer';
export default function Layout(props) {
  const [openNavBar, setOpenNavBar] = React.useState(false)
  function toggleNavBar() {
    setOpenNavBar(!openNavBar)
  }
  const { login } = userContainer.state
  return <Body>
    {login ? <Navigation openNavBar={toggleNavBar} /> : null}
    <NavBar open={openNavBar} setOpen={toggleNavBar} />
      {props.children}
  </Body>
}
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: ${props => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return props.theme.bg.reverse
    }
    return 'white'
  }};
  @media (max-width: 768px) {
    height: 100vh;
    max-height: ${window.innerHeight}px;
  }
`;