import * as React from 'react';
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Provider } from 'unstated-x';
import AppRouter from './route';
import { ThemeProvider } from 'styled-components';
import UITooltip from './Components/UI/UITooltip';
import './app.css'
import { throwServerError } from 'apollo-link-http-common';
import { theme } from './theme';
import UIPopUp from './Components/UI/UIPopUp';
import { UITheme } from './Components/UI/UITheme';

class App extends React.Component {
  public render() {

    return  <UITheme>
        <UITooltip>

          <Provider>
            <$BoxAlgin>
              <AppRouter />
            </$BoxAlgin>
            <ToastContainer transition={Zoom} autoClose={4000} />
          </Provider>
        </UITooltip>

      </UITheme>
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
  & button:focus {
    outline : none;
  }
  & button:active{
    outline : none;
  }
  & button.btn.btn-info:active {
    outline: none;
}
`

export default App;
