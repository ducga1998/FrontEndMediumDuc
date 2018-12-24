import * as React from 'react';
// import styled from 'styled-components'
// import Footer from './Views/footer'';
import Footer from './footer';
import Navigation from './Header/Navigation/navbar';
import Pagination from './pagination'
import styled from 'styled-components';
const HistoryContext = React.createContext(null)
export default function Layout(props) {
  return <HistoryContext.Provider value={props.history}>
    <Body>
      <Navigation />
      {props.children}
      <Footer />
    </Body>
  </HistoryContext.Provider>
}
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  

  background: ${props => {
    // background layout project 
    if(location.pathname==='/login'){
    return props.theme.bg.reverse
  }
  return 'white'
}};

  @media (max-width: 768px) {
    height: 100vh;
    max-height: ${window.innerHeight}px;
  }
`;
