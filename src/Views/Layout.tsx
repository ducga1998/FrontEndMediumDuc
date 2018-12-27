import * as React from 'react';
// import styled from 'styled-components'
// import Footer from './Views/footer'';
import Footer from './footer';
import Navigation from './Header/Navigation/navbar';
import styled from 'styled-components';
import { H1 , H2 } from '../Components/styled/base';
import NavBar from '../workspace/navbar';
export default function Layout(props) {
  const [openNavBar , setOpenNavBar ] = React.useState(false)
  function toggleNavBar() {
    setOpenNavBar(!openNavBar)
  }
  console.log('propspropspropsprops',props)
  return <Body>
      <Navigation openNavBar={toggleNavBar} />
       <NavBar open={openNavBar} setOpen = {toggleNavBar} /> 
      <Slogan>
        <H1>Talk is cheap, show me the code</H1>
        <H2>Linus Torvalds</H2>
      </Slogan>
      {props.children}
      <Footer />
    </Body>
}
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  

  background: ${props => {
    // background layout project 
    if (location.pathname === '/login') {
      return props.theme.bg.reverse
    }
    return 'white'
  }};

  @media (max-width: 768px) {
    height: 100vh;
    max-height: ${window.innerHeight}px;
  }
`;
const Slogan = styled.i`
    padding : 0px 0px 0px 10px;
`