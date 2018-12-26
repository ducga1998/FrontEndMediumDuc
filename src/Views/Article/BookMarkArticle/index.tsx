import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { getAllArticleHashBeenBookMark } from '../../../API/bookmarkAPI';
import userContainer from '../../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../../Components/UI/UILoading';
import Article from '../../Article';
import { FlexRow } from '../../../Components/styled/base';
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


const $ArticleDetail = styled.div`
            `
const $ViewArticle = styled(FlexRow)`
          padding-top : 20px;
            flex-wrap : wrap;
            align-items: initial;
            `

export default ArticleBookMark