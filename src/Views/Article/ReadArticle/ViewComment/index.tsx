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
    allComments : IViewComment[] 
}
// refactor all code for comment 
export default class ViewComment extends React.Component<IViewComment , IStateViewComment> {
    state = {
        allComments: [],
        offset: 0,
    }
    async componentDidMount() {
        const first = 5
        const { idArticle } = this.props
        const allComments = await getAllCommentinArtcileCurrent(idArticle, first, this.state.offset)
        this.setState({ allComments })
    }
    handleComment = (comment) => {
        this.setState({
            allComments: [
                comment,
                ...this.state.allComments,
            ]
        })
    }
    handleLoadMore = async () => {
        const { idArticle } = this.props
        const first = 5
        const offset = this.state.offset + first
        const newArrComment = await getAllCommentinArtcileCurrent(idArticle, first, offset);
        this.setState({ allComments: [...this.state.allComments, ...newArrComment], offset })
    }
    render() {
        const { allComments } = this.state
        if (allComments.length < 0) {
            return <UIPlaceHolder  />
        }
        return <>
                <FormComment onChange={(comment) => { this.handleComment(comment) }} />
                <ListCommentView allComments ={allComments} />
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