import * as React from 'react';
import Layout from './Component/Layout';
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from './Component/footer'
import Article from './Component/Article';
import UIForm from './UI/UIField'
import Login from './Component/Form/login';
import AppRouter from './route'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'unstated-x';
class App extends React.Component {
  public render() {
    return <>
      <Provider>
        {/* <Layout> */}
        {/* <Author /> */}
        <$BoxAlgin>
          <AppRouter />
        </$BoxAlgin>
        {/* </Layout> */}
        <ToastContainer autoClose={4000} />
      </Provider>
    </>
  }
}
const $BoxAlgin = styled.div`
width : '100%';
height : '500px';
display: flex;
align-items : center;
justify-content: center;
`

export default App;
