import * as React from 'react';
import styled from 'styled-components';
import { getAllArticleHashBeenBookMark } from '../../../API/bookmarkAPI';
import userContainer from '../../../Container/userContainer';
import UILoading from '../../../Components/UI/UILoading';
import Article from '../../Article';
import { FlexRow } from '../../../Components/styled/base';
interface IStories {
    match: any
}
class ArticleBookMark extends React.Component<IStories> {
    state = {
        dataBookMark: []
    }
    async componentDidMount() {
        const { idUser  } = userContainer.state.dataUser
        const dataBookMark = await getAllArticleHashBeenBookMark(idUser) as any
        this.setState({ dataBookMark })
        
    }

    render() {
        const { dataBookMark } = this.state as any
        console.log('state', this.state)
        if (!dataBookMark) {
            return <UILoading />
        }

        return <>
            <h1> All Article BookMarked {name}</h1>
            <$ViewArticle>
                {
                    dataBookMark && dataBookMark.length > 0 ? dataBookMark.map((item, key) => {
                    const { articleBookMark, userOwnArticle } = item
                    const { hashTag, contentArticle, titleArticle, createTime, idArticle
                    } = articleBookMark
                    const article = {...articleBookMark , ...{user : userOwnArticle} }
                    console.log('articlearticle',article)
                    return <Article article={article} />

                }) : <h2>NO Article  :), fuck own account stupid </h2>}
            </$ViewArticle>
        </>
    }
}
const $ViewArticle = styled(FlexRow)`
    padding-top : 20px;
    align-items: initial;
`

export default ArticleBookMark