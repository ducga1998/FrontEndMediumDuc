import * as React from 'react';
import styled from 'styled-components';
import ListArticle from '../Reuse/ArticleView/ListArticle';
import Pagination from '../pagination';
import Rank from './Rank';

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
    height  : 100%;
    overflow-y: scroll;
}
.md-list-rank {
    flex : 3;
}
`

