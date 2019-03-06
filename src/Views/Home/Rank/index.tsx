import * as React from 'react'
import { FlexRow, FlexCol, H1 } from '../../../Components/styled/base';
import RankAuthor from './AuthorRank';
import RankArticle from './ArticleRank'
import { rankData } from '../../../API/fetchAPI';
import styled from 'styled-components';
const cachRank  = new Map()
const {useEffect ,useState} = React as any
export default function Rank() {
    const [rankState, setRankState]  = useState(null); 
    console.log('rankState',rankState)
    useEffect(async () => {
        if(cachRank.get('cache')){
            setRankState( cachRank.get('cache') )
            return
        }
        const fetchDataRank = await rankData()
       
        cachRank.set('cache' , fetchDataRank)
        console.log('fetchDataRank',fetchDataRank)
        setRankState(fetchDataRank)
       
    })
    console.log('rankState',rankState)
    if(!rankState ) return null
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
    return <> <H1>The Best Author have follow</H1><RankAuthor type="follow" author={rankFollow}   /></>
}
function RankWriteArticle({rankWriteArticle}) {
    return <><H1>The Best Author have count write article</H1><RankAuthor type="article" author={rankWriteArticle} /></>
}
function RankBookMarkArticle({rankBookMark}){
    return <><H1>The best Article have bookmark</H1>
    <RankArticle article={rankBookMark}></RankArticle>
    </>
}