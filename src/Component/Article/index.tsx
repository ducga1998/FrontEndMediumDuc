import * as React from 'react'
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../UI/styled/layout'
// import AppRouter from '../route'
import { Col, Navbar, Nav, MenuItem, NavDropdown, NavItem, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
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
        <$TotalClap>{totalClap}</$TotalClap>
        <$TotalComment>{totalComment}</$TotalComment>
    </$Article>
}
const $TotalClap = styled.div`
    flex : 1
`
const $TotalComment = styled.div`
flex : 1;
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
`
const $Article = styled.div<any>`
    position :relative;
    display : flex;
    ${$Avatar} {
            flex : 1;
    }


    
`
