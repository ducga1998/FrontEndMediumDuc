import * as React from 'react';
import { getAllInformationUser } from 'src/API/client';
import userContainer from '../../../Container/userContainer';
import UILoading from '../../../Components/UI/UILoading';
import Article from '../../Reuse/ArticleView/ArticleDetail';
import { H2, H1, FlexRow } from '../../../Components/styled/base';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';
import styled from 'styled-components';
interface IStories {
    match: any
}
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
        if (!dataUser) {
            return <UILoading />
        }
        const { articles, avatarLink, name, idUser } = dataUser as any;
        return <>
            <H1> All Article {name}</H1>
            <$ListArticle  >
                {
                    articles && articles.length > 0 ? articles.map((item, key) => {
                    const article = {...item , ...{user : { idUser ,  avatarLink , name }}}
                    return <Article key={key} typeArticle='store' article={article}  />
                }) : <H2> NO Article  :), fuck own account stupid </H2>}
            </$ListArticle>
        </>
    }
}
const $ListArticle = styled(FlexRow)`
    flex-wrap : wrap;
    align-items: initial;
`
export default Stories