import * as React from 'react';
import { getAllInformationUser, IUsertype } from 'API/userAPI';
import userContainer from '../../../Container/userContainer';
import UILoading from 'Components/UI/UILoading';
import Article from '../../Reuse/ArticleView/ArticleDetail';
import { H2, H1, FlexRow } from 'Components/styled/base';;
import styled from 'styled-components';
class Stories extends React.Component {
    state = {
        dataUser: {} as  IUsertype,
        ownProfileId: ''
    }
    async componentDidMount() {
        const { idUser ,   } = userContainer.state.dataUser
        const dataUser = await getAllInformationUser(idUser)
        await this.setState({ dataUser })
    }
    render() {
        const {  dataUser } = this.state 
        if (!dataUser) {
            return <UILoading />
        }
        const { articles, avatarLink, name, idUser  } = dataUser ;
        return <>
            <H1> All Article {name}</H1>
            <$ListArticle  >
                {
                    articles && articles.length > 0 ? articles.map((item, key) => {
                    // const article = {...item , ...{user : { idUser ,  avatarLink , name }}}
                    return <Article key={key} typeArticle='store' article={item}  />
                }) : <H2> No Article :), fuck own account stupid </H2>}
            </$ListArticle>
        </>
    }
}
const $ListArticle = styled(FlexRow)`
    flex-wrap : wrap;
    align-items: initial;
`
export default Stories