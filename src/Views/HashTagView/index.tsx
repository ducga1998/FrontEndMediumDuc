import * as React from 'react';
import styled from 'styled-components';
import ListArticle from '../Reuse/ArticleView/ListArticle';
import Pagination from '../pagination';
import { getAllHashTag } from 'src/API/hashtagAPI';
import UIButton from '../../Components/UI/UIButton';
const {useEffect} = React as any
export default function HashTagView({match}) {
    const [allHashtag , setData]  = React.useState([]) ;
    useEffect(async () => {
        const allHashtag =  await getAllHashTag()
        console.log('allHashtag === > ',allHashtag)
        setData(allHashtag)
    }, [])
    const { params: { name } }  = match
    return <WrapperHome>
        <div className="md-list-article">
            <Pagination />
            <ListArticle idHashTag={name} />
        </div>
        <div className ="md-list-rank">
        {allHashtag.map(article  =>{
            const {idHashTag , nameHashTag , idArticle} = article as any
            return  <UIButton key={idHashTag}>{nameHashTag}</UIButton>
        })}
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

