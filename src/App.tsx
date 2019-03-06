import * as React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Provider } from 'unstated-x';
import AppRouter from './route';
import UITooltip from './Components/UI/UITooltip';
import { UITheme } from './Components/UI/UITheme';
import Toast from './workspace/toast'
import './app.css'
class App extends React.Component {
  public render() {
    return  <UITheme>
        <UITooltip>
          <Provider>
            <$BoxAlgin>
              <AppRouter />
            </$BoxAlgin>
            <Toast />
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
