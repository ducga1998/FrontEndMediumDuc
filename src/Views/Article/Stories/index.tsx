import * as React from 'react';
import { getAllInformationUser } from 'src/API/client';
import userContainer from '../../../Container/userContainer';
import UILoading from '../../../Components/UI/UILoading';
import Article from '../../Article';
import { H2, H1 } from '../../../Components/styled/base';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';
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
            <UIFieldAlgin horizontal style={{ flexWrap  : 'wrap' , flex : 'auto'}}>
                {
                    articles && articles.length > 0 ? articles.map((item, key) => {
                    const article = {...item , ...{user : { idUser ,  avatarLink , name }}}
                    return <Article key={key} typeArticle='store' article={article}  />
                }) : <H2> NO Article  :), fuck own account stupid </H2>}
            </UIFieldAlgin>
        </>
    }
}
export default Stories