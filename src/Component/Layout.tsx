import * as React from 'react';
import Navigation from './Navigation';
// import styled from 'styled-components'
// import Footer from './Component/footer'
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from './footer'

export default function Layout({ children }) {
    return <Grid fluid componentClass="div" >
        {/* <Header /> */}
        <Navigation />
        <section>
            {/* <Row style={{
                // backgroundColor: 'red',
                height: '600px'
            }}> */}
            {/* <Col xs={8} style={{
                    backgroundColor: '#89c4f4',
                    height: '700px'
                }} > */}
            {children}
            {/* </Col> */}
            {/* <Col xs={4} style={{
                    backgroundColor: '#59abe3',
                    height: '700px'
                }} ></Col> */}
            {/* </Row> */}
        </section>
        <Footer />
    </Grid>;
}