
import * as React from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { getArticleById, IArticleType } from '../../../API/articleAPI';
import UILoading from 'Components/UI/UILoading';
import Author from '../../Author';
import UIReaction from 'Components/UI/UIReaction';
import { StyledSolidButton } from 'Components/styled/button';
import { H2, H4, H1, P } from 'Components/styled/base';
import { Section } from 'Components/styled/nav';
import ViewComment from './ViewComment';
import { notificationSocket } from 'socketClient/socket';
import userContainer from '../../../Container/userContainer';
import { timeDifference } from 'help/util';
import UIButton from 'Components/UI/UIButton';

interface IReadArticleType {
    match: { params: { id: string } },
}
export const ArticleContext = React.createContext({})
class ReadArticle extends React.Component<IReadArticleType> {
    state = {
        article: {
            user: {}
        } as IArticleType,
    }
    async componentDidMount() {
        const { match: { params: { id } } } = this.props
        const article = await getArticleById(id)
        if (article) {
            notificationSocket.emit('join', userContainer.state.dataUser.idUser)
            await this.setState({ article })
        }
    }
    componentWillUnmount() {
        const { user: { idUser } } = this.state.article
        if (idUser !== userContainer.state.dataUser.idUser) {
            notificationSocket.emit('leave', idUser)
        }
    }
    render() {
        const { article } = this.state
        if (article) {
            const { user: { idUser, avatarLink, name }, idArticle, contentArticle, titleArticle, hashTagData, createTime } = article
            return <ArticleContext.Provider value={article}>
                <UIReaction idArticle={idArticle} idUseOwnArticler={idUser} titleArticle={titleArticle} />
                <WrapperReadArticle>
                    <div className="pb-duc-introduce-author" >
                        <H1><div dangerouslySetInnerHTML={{__html: titleArticle}} /></H1>
                        <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name || ''} totalArticle={213} />
                        <P style={{ color: '#b2b2b2' }}>{timeDifference(new Date(), new Date(createTime))}</P>
                    </div>
                    <div className="pb-duc-content-article">
                        <P><div dangerouslySetInnerHTML={{__html: contentArticle}} /> </P>
                        <Section>
                            {
                                hashTagData && hashTagData.map((hashTag, key) =>
                                    <UIButton
                                        to={`/hashtag/${hashTag.nameHashTag}`}
                                        key={key}
                                        style={{ fontSize: '15px', margin: '0px 2px' }}>{hashTag.nameHashTag}
                                    </UIButton>
                                )
                            }
                        </Section>

                    </div>
                    <div className="pb-duc-comment">
                        <H2>All Comment Article</H2>
                        <ViewComment idArticle={idArticle} />
                    </div>
                </WrapperReadArticle>
            </ArticleContext.Provider>
        }
        return <UILoading />
    }
}
const WrapperReadArticle = styled.div`
    margin :0  auto;
    width : 70%;
    background : rgb(255, 255, 255);
    .pb-duc-introduce-author {
        margin : 50px 0px 0px;
        h1 {
            font-size : 2.2em
        }
    }
    .pb-duc-content-article {
        margin: 0px 0px 30px 0px;
    }
    .pb-duc-comment {}
`
export default ReadArticle