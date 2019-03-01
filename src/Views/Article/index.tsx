import * as React from 'react';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { filterStringHTML } from '../../help/help';
import { H1, FlexCol, P, H4, H3 } from '../../Components/styled/base';
import { StyledSolidButton } from '../../Components/styled/button';
import { Section } from '../../Components/styled/nav';
import { AvatarImage } from '../../Components/styled/avatar';
import UIFieldAlgin from '../../Components/UI/UIFieldAlgin';
import { timeDifference } from 'src/help/util';

// import { HistoryContext } from '../Layout';

const defaultImg = `http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg`
export interface IArticle {


    typeArticle?: 'store' | 'view',
    article: any,
    vectical?: boolean,
    horizontal?: boolean
    style?: any
}
//  horizontal => normal view . I am see this state very beautifull
// vectical => state list => for admin list article
export default function Article({ article, typeArticle, vectical, horizontal, style }: IArticle) {
    const { hashTag, contentArticle, titleArticle, createTime, idArticle, user, comment, bookmark, imageArticle } = article
    if (!user) {
        return null
    }

    const { name, avatarLink, idUser } = user
    const backgroundArticle = `http://localhost:4000/img/${imageArticle}`
    const linkSwitchArticle = typeArticle && typeArticle === 'store' ? `/store/${idArticle}` : `/article/${idArticle}`

    return <$Article style={style || undefined} vectical={vectical || undefined}>
        <Link to={linkSwitchArticle}>
            {vectical ?
                <AvatarImage size={80} radius="24px" src={`${imageArticle !== defaultImg ? backgroundArticle : './backgroundDefault.jpg'}`} />
                : <WrapperImg>
                    <SrcImage src={`${imageArticle !== defaultImg ? backgroundArticle : './backgroundDefault.jpg'}`} />
                </WrapperImg>}

        </Link>
    <$DetailArticle>
            <UIFieldAlgin>
                <H1 style={{ flex: 6 }}>
                    <Link to={linkSwitchArticle}>{renderHTML(filterStringHTML(titleArticle, false, 35))}</Link>
                </H1>
                {
                    vectical ? null : <> <$TotalClap><i className="fa fa-bookmark" /> {bookmark ? bookmark.length : 0}</$TotalClap>
                    <$TotalComment><i className="fa fa-comment" /> {comment ? comment.length : 0}</$TotalComment></>}
            </UIFieldAlgin>
            <H4> {timeDifference(new Date(), new Date(createTime))}</H4> <br />
            <H4><b>Content : </b>{renderHTML(filterStringHTML(contentArticle))}<Link to={linkSwitchArticle}> Read more ...</Link></H4>
            <UIFieldAlgin horizontal={horizontal || undefined}>
                <AvatarImage plan sizeBorder="2px" src={avatarLink} />
                <H3><b><Link to={`/user/${idUser}`}>{name === '' ? 'NO NAME' : name}</Link></b></H3>
            </UIFieldAlgin>
            <WrapperHashTag>
                {hashTag.map((item: any, key: number) => {
                    return <StyledSolidButton>{item}</StyledSolidButton>
                })}
            </WrapperHashTag>
        </$DetailArticle>

    </$Article>
}

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

const $Article = styled(FlexCol) <any>`
    ${props => props.vectical ? 'flex-direction: row;' : ''};
    align-items : initial;
    position :relative;
    width :   ${props => props.vectical ? '100%' : '400px'};
    border-radius : 5px;
    transition : .3s;
    cursor : pointer;
    padding : 10px;
    box-shadow : 0 6px 10px -4px rgba(0,0,0,.15);
    &:hover {
        ${SrcImage}{
            transform : scale(1.2) ;
        }
        box-shadow: -1px 0px 5px 0px ${props => props.theme.bg.border};
        background-color : ${props => props.theme.bg.wash};
        ${H1}{
            color : ${props => props.theme.brand.alt};
        }
    }
    &:active {
        background-color : ${props => props.theme.space.default};
    }
   
`