
import * as React from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { getArticleById } from '../../../API/articleAPI';
import UILoading from '../../../Components/UI/UILoading';
import Author from '../../Author';
import UIReaction from '../../../Components/UI/UIReaction';
import { StyledSolidButton } from '../../../Components/styled/button';
import {  H2, H4, H3 } from '../../../Components/styled/base';
import { Section } from '../../../Components/styled/nav';
import ViewComment from './ViewComment';
import { notificationSocket } from 'src/socketClient/socket';
import userContainer from '../../../Container/userContainer';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';
import { timeDifference } from 'src/help/util';

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
                    <UIReaction idArticle={idArticle} idUseOwnArticler={idUser} titleArticle={titleArticle}  />
                    <div style={{ width: '70%' }}>
                        <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={213} />
                        <Section>
                            {
                                hashTag.map((item, key) => 
                                     <StyledSolidButton 
                                     key={key} 
                                     style={{ fontSize: '15px', margin: '0px 2px' }}>{item}</StyledSolidButton>
                                )
                            }
                        </Section>
                        <H2>{timeDifference(new Date() ,new Date(createTime))}</H2>
                        {renderHTML(contentArticle)} 
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