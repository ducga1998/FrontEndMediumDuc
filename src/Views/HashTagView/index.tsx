import * as React from 'react';
import styled from 'styled-components';
import ListArticle from '../Reuse/ArticleView/ListArticle';
import { getAllHashTag, getArticleTagByNameHashTag, IHashtTagType } from 'API/hashtagAPI';
import UIButton from 'Components/UI/UIButton';
import { H2, H1 } from 'Components/styled/base';
export default class HashTagView extends React.Component<{ match: { params: { name: string } } }> {
    state = {
        allHashtag: [] as IHashtTagType[],
        listArticle: []
    }
    async componentDidMount() {
        const { match: { params: { name } } } = this.props
        const allHashtag = await getAllHashTag()
        const listArticle = await getArticleTagByNameHashTag(name)
        await this.setState({ allHashtag, listArticle })
    };
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.name !== this.props.match.params.name) {
            const listArticle = await getArticleTagByNameHashTag(this.props.match.params.name);
            await this.setState({ listArticle })
        }
    }

    render() {
        const { match: { params: { name } } } = this.props
        const { listArticle, allHashtag } = this.state
        return <WrapperHome>
            <div className="md-list-article">
                <H1>Hash Tag : {name}</H1>
                <ListArticle listArticle={listArticle} direction={true} />
            </div>
            <div className="md-list-hashtag">
                <H2>All Hash Tag</H2>
                {allHashtag.map(article => {
                    const { idHashTag, nameHashTag } = article
                    return <UIButton category={name === nameHashTag ? 'danger' : undefined}
                        style={{ display: 'inline-block' }}
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
.md-list-hashtag {
    flex : 3;
}
`

