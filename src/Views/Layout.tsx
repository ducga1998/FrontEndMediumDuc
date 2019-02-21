import * as React from 'react';
// import styled from 'styled-components'
// import Footer from './Views/footer'';
import Footer from './footer';
import Navigation from './Header/Navigation/navbar';
import styled from 'styled-components';
import { H1 , H2 } from '../Components/styled/base';
import NavBar from '../workspace/navbar';
import userContainer from '../Container/userContainer';
const link  = "https://vnno-vn-6-tf-mp3-s1-zmp3.zadn.vn/32d773f747b0aeeef7a1/6121980357253417684?authen=exp=1550832150~acl=/32d773f747b0aeeef7a1/*~hmac=b4340446be26717f947826f6802c550e"
export default function Layout(props) {
  const [openNavBar , setOpenNavBar ] = React.useState(false)
  function toggleNavBar() {
    setOpenNavBar(!openNavBar)
  }
 const {login}  = userContainer.state
  return <Body>
     {login? <Navigation openNavBar={toggleNavBar} /> : null}
       <NavBar open={openNavBar} setOpen = {toggleNavBar} /> 
      <Slogan>
        <H1>Talk is cheap, show me the code</H1>
        <H2>Linus Torvalds</H2>
        <video  controls autoPlay={true} >
        <source src={link} type="audio/mpeg" />
      </video>
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
    if (location.pathname === '/login'  ||location.pathname ==='/register') {
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