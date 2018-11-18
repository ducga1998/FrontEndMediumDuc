import * as React from 'react';
// import styled from 'styled-components'
// import Footer from './Component/footer'
import { Grid } from 'react-bootstrap';
import Footer from './footer';
import Navigation from './Navigation/index';

export default function Layout({ children }) {
    return <Grid fluid componentClass="div" style={{
        width: '100%'
    }} >
        <Navigation />
        {children}
        <Footer />
    </Grid>;
}