import * as React from 'react';
// import styled from 'styled-components'
// import Footer from './Component/footer'
import { Grid, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import ListAuthor from './listAuthor';
import ListArticle from './listArticle';
// import Footer from './footer'

export default function Home({ children }) {
    return <$Content>
        <$ListArticle >
            <ListArticle />
        </$ListArticle>
        <$ListAuthor>
            <ListAuthor />
        </$ListAuthor>
    </$Content>
}
const $ListArticle = styled.div`
flex : 9;
`
const $ListAuthor = styled.div`
flex : 2
`

const $Content = styled.div`
display : flex;
width : 100%;
`
