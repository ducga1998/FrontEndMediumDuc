import * as React from 'react'
import { FlexRow, FlexCol, H2 } from '../../../Components/styled/base';
import RankAuthor from './AuthorRank';
import RankArticle from './ArticleRank'
import styled from 'styled-components';
export default function Rank({rankState}) {
    console.log('rankState',rankState)
    //"rankCountBookMarkArticle", "rankFollow", "rankCountWriteArticle"]
    const {rankCountBookMarkArticle , rankFollow,rankCountWriteArticle} = rankState
        return <FlexCol>
            <RankFollow rankFollow={rankFollow} />
            <br />
            <RankWriteArticle rankWriteArticle={rankCountWriteArticle} />
            <br />
            <RankBookMarkArticle rankBookMark={rankCountBookMarkArticle} />
        </FlexCol>
            
       
    
}
function RankFollow({rankFollow}){
    return <> <H2>The Best Author have follow</H2><RankAuthor type="follow" author={rankFollow}   /></>
}
function RankWriteArticle({rankWriteArticle}) {
    return <><H2>The Best Author have follow</H2><RankAuthor type="article" author={rankWriteArticle} /></>
}
function RankBookMarkArticle({rankBookMark}){
    return <><H2>The best Article have bookmark</H2>
    <RankArticle article={rankBookMark}></RankArticle>
    </>
}
const WrapperRank = styled(FlexCol)`

`