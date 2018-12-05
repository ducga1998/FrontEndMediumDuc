import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { getAllArticleHashBeenBookMark } from '../../../API/bookmarkAPI';
import userContainer from '../../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../../UI/UILoading';
import Article from '../../Article';
interface IStories {
    match: any
}
const { useEffect } = React
class ArticleBookMark extends React.Component<IStories> {
    state = {
        dataBookMark: []
    }
    async componentDidMount() {
        const { idUser } = userContainer.state.dataUser
        const dataBookMark = await getAllArticleHashBeenBookMark(idUser)
        console.log('dataBookMark', dataBookMark)
        this.setState({ dataBookMark })
    }

    render() {
        const { dataBookMark } = this.state as any
        console.log('state', this.state)
        if (!dataBookMark) {
            return <UILoading />
        }

        return <$ArticleDetail>
            <h1> All Article BookMarked {name}</h1>
            <$ViewArticle>
                {dataBookMark && dataBookMark.length > 0 ? dataBookMark.map((item, key) => {
                    const { articleBookMark, userOwnArticle } = item
                    const { hashTag, contentArticle, titleArticle, createTime, idArticle
                    } = articleBookMark
                    return <Article user={userOwnArticle} idArticle={idArticle} key={key} hashTag={hashTag} time={createTime} content={contentArticle} totalClap={8} totalComment={9} titleArticle={titleArticle} avatar={`https://picsum.photos/200/200/?a${item}`} />

                }) : <h2>NO Article  :), fuck own account stupid </h2>}
            </$ViewArticle>
        </$ArticleDetail>

        // console.log(followContainer)
    }
}
//"idArticle", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "titleArticle", "imageArticle", "createTime", "__typename"
const $ListAvatarUserFollow = styled.div`
    margin : 10px;
    & img {
        width : 40px;
        height : 40px;
        margin-left : 3px;
        border-radius:50%;
    }

`
const Img = styled.img`

width : 200px;
height : 200px;
border-radius : 50%;
`
const $Author = styled.div`
            `
const $ArticleDetail = styled.div`
            `
const $ViewArticle = styled.div`
            border-top  :2px solid #9eaee8;
            padding-top : 20px;
            `
const $Content = styled.div`
             display : flex;
             
            `
const Left = styled.div`
            flex : 5
            `
const Right = styled.div`
            flex : 6
            `

export default ArticleBookMark