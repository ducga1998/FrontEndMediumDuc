import * as React from 'react';
import styled from 'styled-components';
import { getAllArticle } from '../../API/articleAPI';
import Article from '../Article';
import { Subscribe } from 'unstated-x';
import { allArticleContainer } from '../../Container/articleContainer';
import {  FlexRow} from '../../Components/styled/base';
// improve list article by data : 30/4/2019
interface IListArticle  {
    idHashTag ?: string
    idUser? :string 
    
}
export default class ListArticle extends React.Component<IListArticle> {
    state = {
        value: '',
        allArticleData: []
    }
    async componentDidMount() {
        // this is function get all data article, in have data user
        const allArticleData = await getAllArticle()

        if (allArticleData) {
            this.setState({ allArticleData })
        }
    }
    render() {
        return <Subscribe to={[allArticleContainer]}>
            {
                container => {
                    const { registryArticle , vectical  } = container.state

                    return <$ListArticle>
                    {
                        registryArticle.length > 0 ? registryArticle.map((item: any, key) => {
                            const { articleContainer } = item
                            return <Subscribe   key={key} to={[articleContainer]}>
                                {
                                    () => { 
                                        return <Article vectical={vectical}  article ={articleContainer.state}/>
                                    }
                                }
                            </Subscribe>
                        }) : <h1>No article</h1>
                    }</$ListArticle>
                }
            }
        </Subscribe>
    }
}
const $ListArticle = styled(FlexRow)`
    flex-wrap : wrap;
    align-items: initial;
`