import * as React from 'react';
// import { Aside, Header, Layout, Main, Nav, SubHeader } from '../Components/UI/styled/layout'
// import AppRouter from '../route'
// import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { filterStringHTML } from '../../help/help';
import UILoading from '../../Components/UI/UILoading';
import { H1, FlexCol, P, FlexRow, H4, H3 } from '../../Components/styled/base';
import { StyledSolidButton } from '../../Components/styled/button';
import { Section } from '../../Components/styled/nav';
import { AvatarImage } from '../../Components/styled/avatar';
import { Wrapper } from '../../Components/menu/style';
import history from '../../history';

const defaultImg = `http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg`
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
    typeArticle?: 'store' | 'view',
    imageArticle?: string
}
// => view list Article  =>  you check file listArticle is view props data and function call api to backend
export default function Article({ imageArticle, idArticle, avatar, titleArticle, content, totalClap, time, hashTag, totalComment, user, typeArticle }: IArticle) {
    if (!user) {
        return null
    }
    const { name, avatarLink, idUser } = user
    const backgroundArticle = `http://localhost:4000/img/${imageArticle}`
    const linkSwitchArticle = typeArticle && typeArticle === 'store' ? `/store/${idArticle}` : `/article/${idArticle}`
    return <$Article onMouseDown={() => { history.push(linkSwitchArticle) }}>
        <WrapperImg>
            <SrcImage src={`${imageArticle !== defaultImg ? backgroundArticle : './backgroundDefault.jpg'}`} />
        </WrapperImg>
        <$DetailArticle>
            <FlexRow>
                <$H1 style={{ flex: 6 }}>
                    <Link to={linkSwitchArticle}>{renderHTML(filterStringHTML(titleArticle, true))}</Link>
                </$H1>
                <$TotalClap><i className="fa fa-bookmark" /> {totalClap}</$TotalClap>
                <$TotalComment><i className="fa fa-comment" /> {totalComment}</$TotalComment>
            </FlexRow>
            <H4><b>Create at :</b> {time}</H4> <br />
            <H4><b >Content : </b>{renderHTML(filterStringHTML(content))}<Link to={linkSwitchArticle}> Read more ...</Link></H4>
           <FlexRow>
               <AvatarImage size={30} src={avatar}/>
               <H3><b><Link to={`/user/${idUser}`}>{name === '' ? 'NO NAME' : name}</Link></b></H3>
               </FlexRow> 

            <WrapperHashTag>
                {hashTag.map((item: any, key: number) => {
                    return <StyledSolidButton>{item}</StyledSolidButton>
                })}
            </WrapperHashTag>
        </$DetailArticle>

    </$Article>
}

const $H1 = styled(H1)`
word-break: break-all;
`
const WrapperHashTag = styled(Section)`
flex-wrap: wrap;
`
const WrapperImg = styled.div`
width : 100%;
height : 300px;
overflow : hidden;
`
const SrcImage = styled.img`
    width  : 100%;  
    transition-duration: .3s;
    transition-timing-function: linear;
    transition-property: transform;
`
const $TotalClap = styled(P)`
    flex : 1;
    font-size : 20px;
`
const $TotalComment = styled(P)`
    flex : 1;
    display : flex;
    flex-direction : row;
    font-size : 20px;
`
const $DetailArticle = styled.div`
    flex : 8;
    padding : 20px;
`

const $Article = styled(FlexCol)`
    align-items : initial;
    position :relative;
    width : 400px; 
    border-radius : 5px;
    transition : .3s;
    &:hover {
        ${SrcImage}{
            transform : scale(1.2) ;
        }
        box-shadow: -1px 0px 5px 0px ${props => props.theme.bg.border};
        background-color : ${props => props.theme.bg.wash};
        ${$H1}{
            color : ${props => props.theme.brand.alt};
        }
    }
    cursor : pointer;
    padding : 10px;
`