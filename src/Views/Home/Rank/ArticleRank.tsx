import * as React from 'react';
import { Link } from "react-router-dom";
import { FlexRow, FlexCol, H2, P } from '../../../Components/styled/base';
import { AvatarImage } from '../../../Components/styled/avatar';
import { filterStringHTML, LINK_DEVELOPMENT } from '../../../help/help';
interface IArticle {
    article: any,
    type?: string
}
const ArticleRank = ({ article, type }: IArticle) => {
    //"count", "idUser", "name", "avatarLink", "biographical"]


    return article.map((item , key) => {

        const { user: { avatarLink, idUser, name }, idArticle, titleArticle, imageArticle, count } = item
        // const {count , idUser , name , avatarLink ,biographical } = item
        console.log('imageArticle',imageArticle)
        return <FlexCol key ={key}>
            <FlexRow data-tooltip={filterStringHTML(titleArticle, true, 100)}   >
                <Link to={`/article/${idArticle}`} >
                    <AvatarImage plan sizeBorder="2px" radius={0} size={40} src={`${LINK_DEVELOPMENT}/img/${imageArticle}`} />
                </Link>
                <Link className="name" to={`/article/${idArticle}`}   >
                    <H2 className="caption" >
                        {filterStringHTML(titleArticle, false, 20)}...
                </H2>
                </Link>
            </FlexRow>
            <FlexRow>
                <P><b> {count} bookMark</b></P>
            </FlexRow>
        </FlexCol>
    })
}
export default ArticleRank