import * as React from 'react';
import styled from 'styled-components';
import Article from 'Views/Reuse/ArticleView/ArticleDetail';
import { Subscribe } from 'unstated-x';

import { FlexRow } from 'Components/styled/base';
import { IArticleType } from 'API/articleAPI';

// improve list article by data : 30/4/2019
interface IListArticle {
    listArticle: IArticleType[]
    direction?: boolean

}
export default class ListArticle extends React.Component<IListArticle> {
    render() {
        const { listArticle, direction } = this.props;
        console.log('listArticle', listArticle)
        return <$ListArticle>
            {
                listArticle.length > 0 ? listArticle.map((item: any, key) => {
                    const { articleContainer } = item
                    if (!articleContainer) return <Article key={key} vectical={direction} article={item} />
                    return <Subscribe key={key} to={[articleContainer]}>
                        {
                            () => {
                                return <Article vectical={direction} article={articleContainer.state} />
                            }
                        }
                    </Subscribe>
                }) : <h1>No article</h1>
            }</$ListArticle>
    }
}
const $ListArticle = styled(FlexRow)`
    flex-wrap : wrap;
    align-items: initial;
`