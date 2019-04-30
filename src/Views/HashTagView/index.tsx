import * as React from 'react';
import styled from 'styled-components';
import ListArticle from '../Reuse/ArticleView/ListArticle';
import { getAllHashTag, getArticleTagByNameHashTag } from 'src/API/hashtagAPI';
import UIButton from '../../Components/UI/UIButton';
import { H2 } from 'src/Components/styled/base';
export default class HashTagView extends React.Component<any> {
    state = {
        allHashtag: [],
        listArticle: []
    }
    async componentDidMount() {
        const { match: { params: { name } } } = this.props as any
        const allHashtag = await getAllHashTag()
        const listArticle = await getArticleTagByNameHashTag(name) as any
        console.log('==> listArticle',listArticle)
        await this.setState({ allHashtag, listArticle })
    }
    async componentDidUpdate(prevProps ,prevState){
        console.log('prevProps.match.params.name',prevProps.match.params.name, this.props.match.params.name)
        if(prevProps.match.params.name !== this.props.match.params.name ){
            console.log('updateeeeeeeeeeeee')
            const listArticle = await getArticleTagByNameHashTag(this.props.match.params.name) as any
            await this.setState({  listArticle })
        }
    }

    render() {
        const { match: { params: { name } } } = this.props as any
        const { listArticle, allHashtag } = this.state
        return <WrapperHome>
            <div className="md-list-article">
            <H2>Hash Tag : {name}</H2>
                <ListArticle listArticle={listArticle} direction={true} />
            </div>
            <div className="md-list-rank">
                <H2>All Hash Tag</H2>
                {allHashtag.map(article => {
                    console.log('name',name)
                    const { idHashTag, nameHashTag, idArticle } = article as any
                    return <UIButton category={name === nameHashTag ? 'danger' : undefined} 
                    style={{display : 'inline-block'}}  
                    key={idHashTag}
                     to={`/hashtag/${nameHashTag}`}>{nameHashTag}</UIButton>
                })}
            </div>
        </WrapperHome>
    }
}

const WrapperHome = styled.div`
display : flex;
width : 100%;
.md-list-article{
    flex : 9;
    height  : 100%;
    overflow-y: scroll;
}
.md-list-rank {
    flex : 3;
}
`

