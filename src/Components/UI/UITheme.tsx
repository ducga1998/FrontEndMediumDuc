import * as React from 'react'
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';
// import { render } from 'react-dom';
export class  UITheme extends React.Component<any>{
    // const [theme , setTheme]
    state = {theme}
    render(){
            return <ThemeProvider theme={this.state.theme}>
                        {this.props.children }
                </ThemeProvider>
    }
}