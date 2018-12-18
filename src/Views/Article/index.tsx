import * as React from 'react';
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../Components/UI/styled/layout'
// import AppRouter from '../route'
// import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { filterStringHTML } from '../../help/help';
import UILoading from '../../Components/UI/UILoading';
import { H1, FlexCol, P  } from '../../Components/styled/base';
import { StyledSolidButton } from '../../Components/styled/button';
import { Section } from '../../Components/styled/nav';
import { AvatarImage } from '../../Components/styled/avatar';

export interface IArticle {
    avatar: String;
    titleArticle: String;
    content: String;
    totalClap: number;
    time: String;
    hashTag: any[],
    totalComment: number
    idArticle: string
    user: any,
    typeArticle?: 'store' | 'view'
}

// => view list Article  =>  you check file listArticle is view props data and function call api to backend
export default function Article({ idArticle, avatar, titleArticle, content, totalClap, time, hashTag, totalComment, user, typeArticle }: IArticle) {
    console.log('user', user)
    if (!user) {
        return null
    }
    const { name, avatarLink, idUser } = user
    const linkSwitchArticle = typeArticle && typeArticle === 'store' ? `/store/${idArticle}` : `/article/${idArticle}`
    return <$Article>
        
            <AvatarImage size ={100}  src={`${avatarLink ? avatarLink : avatar}`} />
      
        <$DetailArticle>
            <H1><Link to={linkSwitchArticle}>{renderHTML(filterStringHTML(titleArticle, true))}</Link></H1>
            <small><b>Create at :</b> {time}</small> <br />
            <b >Content : </b>{renderHTML(filterStringHTML(content))}<Link to={linkSwitchArticle}> Read more ...</Link>
            <P><b>Write by :</b> <b><Link to={`/user/${idUser}`}>{name === '' ? 'NO NAME' : name}</Link></b></P>
            
                   <Section> {hashTag.map((item: any, key: number) => {
                        return <StyledSolidButton>{item}</StyledSolidButton>
                    })}
                    </Section>
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
    img {
        width :100%;
        flex : 1;
 }
`
const $DetailArticle = styled.div`
    flex : 8;
    padding : 20px;
`
const $Article = styled.div`
    position :relative;
    display : flex;
    border-bottom: 1px solid ${props => props.theme.bg.hairline};
    transition : 0.3s;
    ${$Avatar} {
            flex : 1;
    }
    &:hover {
    background-color: ${props => props.theme.bg.default};
    transition : 0.3s;
    }
`
