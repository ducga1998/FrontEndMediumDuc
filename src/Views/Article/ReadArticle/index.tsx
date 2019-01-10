
import * as React from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { getArticleById } from '../../../API/articleAPI';
import UILoading from '../../../Components/UI/UILoading';
import Author from '../../Author';
import commentContainer from '../../../Container/commentContainer';
import UIReaction from '../../../Components/UI/UIReaction';
import { StyledSolidButton } from '../../../Components/styled/button';
import {  H2, fontStack, H4, H3 } from '../../../Components/styled/base';
import { Section } from '../../../Components/styled/nav';
import ViewComment from './comment';
import { notificationSocket } from 'src/socketClient/socket';
import userContainer from '../../../Container/userContainer';
import FormComment from './FormComment';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';

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
        const { match: { params: { id } } } = this.props
        commentContainer.getAllCommentByIdArticle(id ,  0 , 5)
        const article = await getArticleById(id) as any
        if (article) {
          
            notificationSocket.emit('join', userContainer.state.dataUser.idUser)
            await this.setState({ article })
        }
        
    }
    componentWillUnmount() {
        const {user :  {idUser}}  = this.state.article as any
        if (idUser !== userContainer.state.dataUser.idUser) {
            notificationSocket.emit('leave', idUser)
        }
    }
    render() {
        const { article }: any = this.state
        if (article) {
            const { user: { idUser, avatarLink, name }, idArticle, contentArticle, titleArticle, hashTag, createTime } = article
            return <ArticleContext.Provider value={article}>
                <UIFieldAlgin style={{justifyContent: 'center'}}>
                    {/* UIReraction need idArticle and idUser own this article */}
                    <UIReaction idArticle={idArticle} idUseOwnArticler={idUser} titleArticle={titleArticle}  />
                    <div style={{
                        width: '70%',

                    }}>
                        <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={213} />
                        <Section>
                            <H2> HashTag : </H2> {hashTag.map((item, key) => {
                                return <StyledSolidButton key={key} style={{ fontSize: '15px', margin: '0px 2px' }}>{item}</StyledSolidButton>
                            })}
                        </Section>
                        <H2>{createTime}</H2>
                        <H3>{renderHTML(contentArticle)} </H3>
                        <Space />
                        <H2>All Comment Article</H2>
                       
                        <ViewComment idArticle={idArticle} />
                    </div>
                </UIFieldAlgin>
            </ArticleContext.Provider>
        }
        return <UILoading />
    }
}
export default ReadArticle
const Space = styled.div`
width  :100%;
height : 40px;
border-top : 3px solid ${props => props.theme.bg.wash};
`