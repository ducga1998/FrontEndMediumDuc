import * as React from 'react';
import styled from 'styled-components';
import { getAllArticle } from '../../API/articleAPI';
import Article from '../Article';
import { Subscribe } from 'unstated-x';
import { allArticleContainer } from '../../Container/articleContainer';
import { FlexCol, FlexRow, H2 } from '../../Components/styled/base';
// import Footer from './footer'
const { useEffect, useState } = React as any
export default class ListArticle extends React.Component<any> {
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
                    const { registryArticle } = container.state

                    return <$ListArticle>
                    {
                        registryArticle.length > 0 ? registryArticle.map((item: any, key) => {
                            const { articleContainer } = item
                            return <Subscribe   key={key} to={[articleContainer]}>
                                {
                                    () => { 
                                        return <Article article ={articleContainer.state}/>
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
const ListArticleComponent = function({articles}){

}
const $ListArticle = styled(FlexRow)`
    flex-wrap : wrap;
    align-items: initial;
`