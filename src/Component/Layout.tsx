import * as React from 'react';
// import styled from 'styled-components'
// import Footer from './Component/footer'
import { Grid } from 'react-bootstrap';
import Footer from './footer';
import Navigation from './Navigation/index';
import Pagination from './pagination'
const HistoryContext = React.createContext(null)
export default function Layout(props) {
    console.log('propspropsprops', props)
    return <HistoryContext.Provider value={props.history}><Grid fluid componentClass="div" style={{
        width: '100%'
    }} >
        <Navigation />
        {props.children}
        <Footer />
    </Grid></HistoryContext.Provider>
}