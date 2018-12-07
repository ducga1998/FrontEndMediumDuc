import * as React from 'react';
// import styled from 'styled-components'
// import Footer from './Component/footer'
import { Grid } from 'react-bootstrap';
import Footer from './footer';
import Navigation from './Navigation/index';
import Pagination from './pagination'

export default function Layout(props) {
    console.log('propspropsprops', props)
    return <Grid fluid componentClass="div" style={{
        width: '100%'
    }} >
        <Navigation />
        {props.children}
        <Footer />
    </Grid>;
}