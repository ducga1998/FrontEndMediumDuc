
import * as React from 'react';
import { Label } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { getArticleById } from '../../../API/articleAPI';
import UILoading from '../../../UI/UILoading';
import Author from '../../Author';
import CommentArticle from './comment';
import WriteComment from './writeComment';
import commentContainer from '../../../Container/commentContainer';
import UIReaction from '../../../UI/UIReaction';
import UIRichText from '../../../UI/UIRichText';

interface IReadArticleType {
    match: any,
    router?: any,
    route?: any
}
export const ArticleContext = React.createContext(null)
class ReadArticle extends React.Component<IReadArticleType> {
    state = {
        article: null,
    }
    async componentDidMount() {
        const { match: { params: { id } }, router } = this.props
        commentContainer.getAllCommentByIdArticle(id)
        const article = await getArticleById(id) as any
        if (article) {
            await this.setState({ article })
        }
    }
    render() {
        const { article }: any = this.state
        if (article) {
            const { user: { idUser, avatarLink, name }, idArticle, contentArticle, titleArticle, hashTag, createTime } = article
            return <ArticleContext.Provider value={article}>
                <$Align>
                    {/* UIReraction need idArticle and idUser own this article */}
                    <UIReaction idArticle={idArticle} idUseOwnArticler={idUser} />
                    <div style={{
                        width: '70%'
                    }}>
                        <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={213} />
                        <$HashTag>
                            HashTag :  {hashTag.map((item, key) => {
                                return <Label key={key} style={{ fontSize: '15px', margin: ' 0px' }}>{item}</Label>
                            })}
                        </$HashTag>
                        <p>{createTime}</p>
                        <UIRichText isTitle mode="view" >
                            <h1> {renderHTML(titleArticle)}</h1>
                        </UIRichText>
                        <UIRichText mode="view" >
                            {renderHTML(contentArticle)}
                        </UIRichText>
                        <WriteComment idUser={idUser} />
                        <h2>All Comment Article</h2>
                        <CommentArticle
                            idArticle={idArticle} />
                    </div>
                </$Align>
            </ArticleContext.Provider>
        }
        return <UILoading />
    }
}
export default ReadArticle
const $HashTag = styled.div`
    font-family : 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-stretch : 700;
    margin : 20px 0px;
    >span {
        margin-left : 5px;
    }
`
const $Align = styled.div`
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
`