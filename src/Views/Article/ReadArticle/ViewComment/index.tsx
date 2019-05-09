import * as React from 'react';

import styled from 'styled-components';
import FormComment from './FormComment';
import { getAllCommentinArtcileCurrent } from 'src/API/commentAPI';
import { StyledTextButton } from 'src/Components/styled/button';
import ListCommentView from './ListCommentView';;
import UIPlaceHolder from '../../../../Components/UI/UIPlaceholder';
interface IViewComment {
    idArticle: string,

}
interface IStateViewComment {
    offset : number,
    allComment : IViewComment[] 
}
// refactor all code for comment 
export default class ViewComment extends React.Component<IViewComment , IStateViewComment> {
    state = {
        allComment: [],
        offset: 0,
    }
    async componentDidMount() {
        const first = 5
        const { idArticle } = this.props
        const allComment = await getAllCommentinArtcileCurrent(idArticle, first, this.state.offset)
        this.setState({ allComment })
    }
    handleComment = (comment) => {
        this.setState({
            allComment: [
                comment,
                ...this.state.allComment,
            ]
        })
    }
    handleLoadMore = async () => {
        const { idArticle } = this.props
        const first = 5
        const offset = this.state.offset + first
        const newArrComment = await getAllCommentinArtcileCurrent(idArticle, first, offset);
        this.setState({ allComment: [...this.state.allComment, ...newArrComment], offset })
    }
    render() {
        const { allComment } = this.state
        if (allComment.length < 0) {
            return <UIPlaceHolder  />
        }
        return <>
                <FormComment onChange={(comment) => { this.handleComment(comment) }} />
                <ListCommentView allComment ={allComment} />
                <LoadMoreButton 
                        onMouseDown = {this.handleLoadMore}> Load More 
                 </LoadMoreButton> 
            </>
    }
}
const LoadMoreButton = styled(StyledTextButton)`
    display : block;
    margin : auto;
`