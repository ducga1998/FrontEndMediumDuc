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
import omit from 'lodash/omit'
import { splitBsPropsAndOmit } from 'react-bootstrap/lib/utils/bootstrapUtils';
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
        const { idUser ,   } = userContainer.state.dataUser

        const dataUser = await getAllInformationUser(idUser)

        await this.setState({ dataUser })
    }
    render() {
        const {  dataUser } = this.state as any
        console.log('state', this.state)
        if (!dataUser) {
            return <UILoading />
        }
        const { articles, avatarLink, name, idUser } = dataUser as any;

        return <$ArticleDetail>
            <H1> All Article {name}</H1>
            <$ViewArticle>
                {articles && articles.length > 0 ? articles.map((item, key) => {
                    const article = {...item , ...{user : { idUser ,  avatarLink , name }}}
                    return <Article key={key} typeArticle='store' article={article}  />

                }) : <H2>NO Article  :), fuck own account stupid </H2>}
            </$ViewArticle>
        </$ArticleDetail>
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