
import * as React from 'react';
import { Label } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { getArticleById } from '../../../API/articleAPI';
import UILoading from '../../../Components/UI/UILoading';
import Author from '../../Author';
import CommentArticle from './comment';
import WriteComment from './writeComment';
import commentContainer from '../../../Container/commentContainer';
import UIReaction from '../../../Components/UI/UIReaction';
import UIRichText from '../../../Components/UI/UIRichText';
import { StyledSolidButton } from '../../../Components/styled/button';
import { FlexRow, FlexCol, H2, fontStack, H4 } from '../../../Components/styled/base';
import { Section } from '../../../Components/styled/nav';

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
                        width: '70%',
                      
                    }}>
                        <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={213} />
                        <Section    >
                            <H2> HashTag : </H2> {hashTag.map((item, key) => {
                                return <StyledSolidButton key={key} style={{ fontSize: '15px', margin: '0px 2px' }}>{item}</StyledSolidButton>
                            })}
                        </Section>
                        <H2>{createTime}</H2>
                        <H4 style={{
                              fontSize : '1.5em'
                        }}>   {renderHTML(titleArticle)}

                        {renderHTML(contentArticle)}

                        </H4>

                        <WriteComment idUser={idUser} />
                        <H2>All Comment Article</H2>
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
    ${fontStack}
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
`