import * as React from 'react';
import styled from 'styled-components';
import ListArticle from './listArticle';
import Pagination from '../pagination';
import { H2 } from '../../Components/styled/base';
import Rank from './Rank';
// import Footer from './footer'

export default function Home() {
    return <WrapperHome>
        <div className="md-list-article">
            <Pagination />
            <ListArticle />
        </div>
        <div className ="md-list-rank">
            <Rank  />
        </div>
    </WrapperHome>
}

const WrapperHome = styled.div`
display : flex;
width : 100%;
.md-list-article{
    flex : 9;
}
.md-list-rank {
    flex : 3
}
`

