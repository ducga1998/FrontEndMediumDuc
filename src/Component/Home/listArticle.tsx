import * as React from 'react';
import styled from 'styled-components';
import { getAllArticle } from '../../API/articleAPI';
import Article from '../Article';
import { Subscribe } from 'unstated-x';
import { allArticleContainer } from '../../Container/articleContainer';
// import Footer from './footer'
const { useEffect, useState } = React as any
export default class ListArticle extends React.Component<any> {
    state = {
        value: '',
        allArticleData: []
    }
    async componentDidMount() {
        // this is function get all data article, in have data user
        const dataFake = await getAllArticle()
        // console.log('dataFake', dataFake)
        if (dataFake) {
            const { data: { getAllArticle } } = dataFake as { data: { getAllArticle: any[] } }
            this.setState({ allArticleData: getAllArticle })
        }
    }


    render() {
        return <Subscribe to={[allArticleContainer]}>
            {
                container => {
                    const { registryArticle } = container.state

                    return <$ListArticle>{
                        registryArticle.length > 0 ? registryArticle.map((item: any, key) => {
                            const { articleContainer } = item
                            return <Subscribe to={[articleContainer]}>
                                {
                                    () => {
                                        const { hashTag, contentArticle, titleArticle, createTime, idArticle, user, comment } = articleContainer.state
                                        return <Article
                                            user={user}
                                            idArticle={idArticle}
                                            key={key}
                                            hashTag={hashTag}
                                            time={createTime}
                                            content={contentArticle}
                                            totalClap={8}
                                            totalComment={comment.length}
                                            titleArticle={titleArticle}
                                            avatar={`https://picsum.photos/200/200/?a${item}`} />
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
const $ListArticle = styled.div`
    overflow : scroll;
`