import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../../API/followAPI';
import userContainer from '../../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../../Components/UI/UILoading';
import Article from '../../Article';
import { H2, FlexRow, H1 } from '../../../Components/styled/base';
interface IStories {
    match: any
}
const { useEffect } = React
class Stories extends React.Component<IStories> {
    state = {
        dataUser: null,
        ownProfileId: ''
    }
    async componentDidMount() {
        const { idUser } = userContainer.state.dataUser

        const dataUser = await getAllInformationUser(idUser)

        await this.setState({ dataUser })
    }
    render() {
        const { ownProfileId, dataUser } = this.state as any
        console.log('state', this.state)
        if (!dataUser) {
            return <UILoading />
        }
        const { articles, avatarLink, name, idUser } = dataUser as any;

        return <$ArticleDetail>
            <H1> All Article {name}</H1>
            <$ViewArticle>
                {articles && articles.length > 0 ? articles.map((item, key) => {
                    const { hashTag, isUSer, contentArticle, titleArticle, createTime, idArticle , imageArticle } = item
                    return <Article typeArticle='store' user={dataUser} idArticle={idArticle} key={key} imageArticle={imageArticle} hashTag={hashTag} time={createTime} content={contentArticle} totalClap={8} totalComment={9} titleArticle={titleArticle} avatar={`https://picsum.photos/200/200/?a${item}`} />

                }) : <H2>NO Article  :), fuck own account stupid </H2>}
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
export default Stories