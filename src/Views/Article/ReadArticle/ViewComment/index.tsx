import * as React from 'react';

import styled from 'styled-components';
import { IMAGE_SOURCE_DEFAULT } from 'src/help/define';
import FormComment from './FormComment';
import { AvatarImage } from 'src/Components/styled/avatar';
import { H2 } from 'src/Components/styled/base';
import userContainer from 'src/Container/userContainer';
import { getAllCommentinArtcileCurrent } from 'src/API/commentAPI';

import { StyledTextButton } from 'src/Components/styled/button';
import { timeDifference } from 'src/help/util';
import UIButton from 'src/Components/UI/UIButton';
import ListCommentView from './ListCommentView';
interface IViewComment {
    idArticle: string,

}
// refactor all code for comment 
export default class ViewComment extends React.Component<IViewComment> {
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
        const newArrComment = await getAllCommentinArtcileCurrent(idArticle, first, offset) as any[]
        this.setState({ allComments: [...this.state.allComments, ...newArrComment], offset })
    }
    render() {
        const { allComments } = this.state
        if (allComments.length < 0) {
            return <UIButton isLoading />
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