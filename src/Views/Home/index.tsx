import * as React from 'react';
import styled from 'styled-components';
import ListArticle from './listArticle';
import ListAuthor from './listAuthor';
import Pagination from '../pagination';
import { H2 } from '../../Components/styled/base';
// import Footer from './footer'

export default function Home() {
    return <$Content>
        <$ListArticle >
            <Pagination />
           
            <ListArticle />
        </$ListArticle>
        <$ListAuthor>
            <ListAuthor  />
        </$ListAuthor>
    </$Content>
}
const $ListArticle = styled.div`
flex : 9;
`
const $ListAuthor = styled.div`
flex : 2;
`

const $Content = styled.div`
display : flex;
width : 100%;
`

