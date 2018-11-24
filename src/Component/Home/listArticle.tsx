import * as React from 'react';
import styled from 'styled-components';
import { getAllArticle } from '../../API/articleAPI';
import Article from '../Article';
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
        const { allArticleData } = this.state
        return <$ListArticle>{
            allArticleData.length > 0 ? allArticleData.map((item: any, key) => {
                const { hashTag, isUSer, contentArticle, titleArticle, createTime, idArticle, user, comment } = item
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
            }) : <h1>No article</h1>
        }</$ListArticle>
    }
}
const $ListArticle = styled.div`
    overflow : scroll;
`