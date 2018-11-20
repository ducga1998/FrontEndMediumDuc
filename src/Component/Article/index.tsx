import * as React from 'react';
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../UI/styled/layout'
// import AppRouter from '../route'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export interface IArticle {
    avatar: String;
    titleArticle: String;
    content: String;
    totalClap: number;
    time: String;
    hashTag: any[],
    totalComment: number
    idArticle: string
    user: any
}
// => view list Article  =>  you check file listArticle is view props data and function call api to backend
export default function Article({ idArticle, avatar, titleArticle, content, totalClap, time, hashTag, totalComment, user }: IArticle) {
    const { name, avatarLink, idUser } = user
    return <$Article>
        <$Avatar>
            <img src={`${avatarLink ? avatarLink : avatar}`} />
        </$Avatar>
        <$DetailArticle>
            <h2><Link to={`/article/${idArticle}`}>{renderHTML(titleArticle)}</Link></h2>
            <small>Create at : {time}</small>
            <b>Content : </b>{renderHTML(content)}
            <p>Write by : <b><Link to={`/user/${idUser}`}>{name === '' ? 'NO NAME' : name}</Link></b></p>
            <ButtonToolbar>
                <ButtonGroup>
                    {hashTag.map((item: any, key: number) => {
                        return <Button>{item}</Button>
                    })}
                </ButtonGroup>
            </ButtonToolbar>
        </$DetailArticle>
        <$TotalClap><i className="fa fa-bookmark" /> {totalClap}</$TotalClap>
        <$TotalComment><i className="fa fa-comment" /> {totalComment}</$TotalComment>
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
