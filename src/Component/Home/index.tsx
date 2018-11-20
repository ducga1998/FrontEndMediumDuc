import * as React from 'react';
import styled from 'styled-components';
import ListArticle from './listArticle';
import ListAuthor from './listAuthor';
// import Footer from './footer'

export default function Home({ children, history, match }) {
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
