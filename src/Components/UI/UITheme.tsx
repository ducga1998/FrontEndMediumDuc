import * as React from 'react'
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';
export class  UITheme extends React.Component{

    state = {
        theme  
    }
    render(){
            return <ThemeProvider theme={theme}>
                        {this.props.children }
                </ThemeProvider>
    }
}