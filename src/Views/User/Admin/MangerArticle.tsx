import * as React from 'react';
import { getAllInformationUser } from 'src/API/client';
import userContainer from '../../../Container/userContainer';
import UILoading from '../../../Components/UI/UILoading';
import Article from '../../Article';
import { H2 } from '../../../Components/styled/base';
import UIFieldAlgin from '../../../Components/UI/UIFieldAlgin';
import UIButton from '../../../Components/UI/UIButton';
interface IManagerArticles {
    match: any
}
class ManagerArticles extends React.Component<IManagerArticles> {
    state = {
        dataUser: null,
        ownProfileId: ''
    }
    async componentDidMount() {
        const { idUser, } = userContainer.state.dataUser

        const dataUser = await getAllInformationUser(idUser)

        await this.setState({ dataUser })
    }
    render() {
        const { dataUser } = this.state as any
        if (!dataUser) {
            return <UILoading />
        }
        const { articles, avatarLink, name, idUser } = dataUser as any;

        return <UIFieldAlgin horizontal>
            {articles && articles.length > 0 ? articles.map((item, key) => {
                const article = { ...item, ...{ user: { idUser, avatarLink, name } } }
                return <UIFieldAlgin key={key}>
                    <Article style={{ pointerEvents : 'none'}} vectical key={key} typeArticle='store' article={article} />
                    <UIButton icon="delete" category="danger" onMouseDown={() => { }} >Delete</UIButton>
                    <UIButton  icon ="edit" category="space" onMouseDown={() => { }} >Update Detail </UIButton>
                </UIFieldAlgin>


            }) : <H2>NO Article  :), fuck own account stupid </H2>}
        </UIFieldAlgin>
    }
}
export default ManagerArticles