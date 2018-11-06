import * as React from 'react';
import Navigation from './Navigation';
// import styled from 'styled-components'
// import Footer from './Component/footer'
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from './footer'
export default function Layout({ children }) {
    return <Grid fluid componentClass="div">
        <Row>
            <Navigation />
        </Row>
        <Row style={{
            // backgroundColor: 'red',
            height: '600px'
        }}>
            <Col xs={8} style={{
                backgroundColor: 'green',
                height: '700px'
            }} >
                {children}
            </Col>
            <Col xs={4} style={{
                backgroundColor: 'blue',
                height: '700px'
            }} ></Col>
        </Row>
        <Footer />
    </Grid>;
}