import * as React from 'react'
import { ThemeProvider } from 'styled-components';

import theme from '../../theme';
export class  UITheme extends React.Component<{children : React.ReactElement<any>}>{

    state = {
        theme  
    }
    render(){
            return <ThemeProvider theme={theme}>
                        {this.props.children }
                </ThemeProvider>
    }
}