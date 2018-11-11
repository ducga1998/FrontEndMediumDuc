import * as React from 'react';
// import Navigation from './Navigation';
// import styled from 'styled-components'
// import Footer from './Component/footer'
import { Grid, Row, Col } from 'react-bootstrap';
// import Footer from './footer'

export default function Layout({ children }) {
    return <Grid fluid componentClass="div" >
        {children}
        acascas
    </Grid>;
}