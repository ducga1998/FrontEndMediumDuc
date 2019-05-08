import * as React from 'react';
import styled from 'styled-components';
import { getAllArticleHashBeenBookMark, IBookMarkType } from '../../../API/bookmarkAPI';
import userContainer from '../../../Container/userContainer';
import Article from '../../Reuse/ArticleView/ArticleDetail';
import { FlexRow } from '../../../Components/styled/base';
class ArticleBookMark extends React.Component<{} > {
    state = {
        dataBookMark: [] as IBookMarkType[]
    }
    async componentDidMount() {
        const { idUser  } = userContainer.state.dataUser
        const dataBookMark = await getAllArticleHashBeenBookMark(idUser) ;
        this.setState({ dataBookMark })
    }   

    render() {
        const { dataBookMark } = this.state 
        return <>
            <h1> All Article BookMarked {name}</h1>
            <$ViewArticle>
                {
                    dataBookMark && dataBookMark.length > 0 ? dataBookMark.map((item, key) => {
                    const { articleBookMark } = item
                    const article = {...articleBookMark , ...{user : userContainer.state.dataUser } }
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