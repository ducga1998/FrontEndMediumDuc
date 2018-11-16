import * as React from 'react';
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../UI/styled/layout'
// import AppRouter from '../route'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import styled from 'styled-components';
export interface IArticle {
    avatar: String;
    titleArticle: String;
    content: String;
    totalClap: number;
    time: String;
    hashTag: any[],
    totalComment: number
}
export default function Article({ avatar, titleArticle, content, totalClap, time, hashTag, totalComment }: IArticle) {
    return <$Article>
        <$Avatar>
            <img src={`${avatar}`} />
        </$Avatar>
        <$DetailArticle>
            <h2>{titleArticle}</h2>
            <small>{time}</small>
            <p>{content}</p>

            <ButtonToolbar>
                <ButtonGroup>
                    {hashTag.map((item: any, key: number) => {
                        return <Button>{item.name}</Button>
                    })}
                </ButtonGroup>
            </ButtonToolbar>
        </$DetailArticle>
        <$TotalClap><i className="fa fa-bookmark" />{totalClap}</$TotalClap>
        <$TotalComment><i className="fa fa-comment" />{totalComment}</$TotalComment>
    </$Article>
}
const $TotalClap = styled.div`
    flex : 1;
    font-size : 20px;
`
const $TotalComment = styled.div`
    flex : 1;
    font-size : 20px;
`
const $Avatar = styled.div`
    background-color : "red";
    img {
        width :100%;
        flex : 1;
 }
`
const $DetailArticle = styled.div`
    flex : 8;
    padding : 20px;
`
const $Article = styled.div<any>`
    position :relative;
    display : flex;
    border-bottom: 1px solid #d9d5d5;
    margin-bottom: 13px;
    ${$Avatar} {
            flex : 1;
    }
`
