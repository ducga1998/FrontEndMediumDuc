import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Provider } from 'unstated-x';
import AppRouter from './route';
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
  &  a:hover {
    text-decoration : none;
  }
`

export default App;
