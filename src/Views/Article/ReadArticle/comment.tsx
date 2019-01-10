import * as React from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { Subscribe } from 'unstated-x';
import commentAllContainer from '../../../Container/commentContainer';
import UILoading from '../../../Components/UI/UILoading';
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import FormComment from './FormComment';
import { AvatarImage } from '../../../Components/styled/avatar';
import { H2 } from '../../../Components/styled/base';
import userContainer from '../../../Container/userContainer';
import { getAllCommentinArtcileCurrent } from '../../../API/commentAPI';
import UIButton from '../../../Components/UI/UIButton';
import { StyledTextButton } from '../../../Components/styled/button';
interface IViewComment {
    idArticle: string,

}
export default class ViewComment extends React.Component<IViewComment> {
    state = {
        allComments: [],
        offset: 0,
        isFetch: true
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
        if (newArrComment.length === 0) {
            this.setState({ isFetch: false })
        }
        this.setState({ allComments: [...this.state.allComments, ...newArrComment], offset })
    }
    render() {
        const { allComments, isFetch } = this.state
        if (allComments.length < 0) {
            return <UIButton isLoading />
        }
        return <>
            <FormComment onChange={(comment) => { this.handleComment(comment) }} />
            <WrapperComment>
                <> {allComments.length > 0 ? allComments.map((item: any, key) => {
                    const { idRely } = item
                    let dataRely
                    if (!idRely) {
                        // loop all comment, find idComment  === idRely 
                        dataRely = allComments.filter((comment: any) => {
                            if (comment.idRely) {
                                return comment.idRely === item.idComment
                            }
                        })
                    }
                    return <Comment dataUserComment={item} relyComment={dataRely && dataRely.length > 0 ? dataRely : undefined} />
                }) :
                    <H2 style={{ textAlign: 'center', color: 'gray' }}> NO  Comment,  : ))) cmt vào cho vui đi thằng ngu</H2>
                }
                    {isFetch ? <LoadMoreButton onMouseDown={this.handleLoadMore}>Load More </LoadMoreButton> : null}
                </>
            </WrapperComment>
        </>
    
    }
}
// comment only comment => we handle data coment a here
const WrapperComment = styled.div``
const LoadMoreButton = styled(StyledTextButton)`
    display : block;
    margin : auto;
`
const Comment = ({ dataUserComment, relyComment }: { dataUserComment: any, relyComment?: any }) => {
    const [open, setOpen] = React.useState(false)
    const [dataRely, setDataRely] = React.useState(relyComment ? relyComment : [])
    //    console.log('dataRelydataRely',dataRely)
    function renderCommentRely(commentRely: any) {
        return commentRely.map(comment => {
            const { userComment: { avatarLink, name }, createdAt, content, idComment } = comment
            return <$Comment data-id={idComment} data-tooltip={`Created At : ${new Date(createdAt)}`}>
                <AvatarImage data-tooltip={name} src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} />
                <$Content  >{renderHTML(content)}</$Content>
            </$Comment>
        })
    }
    function addCommentRely(rely) {
        const { avatarLink, name } = userContainer.state.dataUser
        rely = { ...rely, ...{ userComment: { avatarLink, name } } };
        dataRely.push(rely); setDataRely(dataRely)
    }

    function renderComment(comment) {
        const { userComment: { avatarLink, name }, createdAt, content, idComment, idRely } = comment
        if (idRely) {
            return null
        }
        return <>
            <$Comment data-id={idComment} onMouseDown={(event) => { setOpen(!open) }} data-tooltip={`Created At : ${new Date(createdAt)}`}>
                <AvatarImage data-tooltip={name} src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} />
                <$Content  >{renderHTML(content)}</$Content>
                {dataRely && dataRely.length > 0 ? <CountRely><H2>{dataRely.length} Rely comment</H2></CountRely> : null}
            </$Comment>

            {open ? <WrapperRely>    {dataRely && dataRely.length > 0 ? renderCommentRely(dataRely) : null} <FormComment onChange={addCommentRely} idRely={idComment} />  </WrapperRely> : null}
        </>
    }
    return renderComment(dataUserComment)
}
const CountRely = styled.div`

`
const WrapperRely = styled.div`
padding  : 10px 0px 0px 40px;
`
const $Content = styled.div`
    &:focus {
    flex : 1;
    background-color: #f3f3f3;
    transition: 0.2s;
    outline: none;
    border-radius: 10px;
    color: black;
    padding: 30px;
    font-size: 20px;
    }
    & {
        flex : 10;
        margin-left: 30px;
        margin-bottom : 10px;
        transition: 0.2s;
    }
`
const $Comment = styled.div`
    align-items: center;
    img {
        width : 50px;
        height : 50px;
        border-radius : 50%;
    }
    border-bottom: 1px solid  ${props => props.theme.bg.border};
    display : flex;
    /* margin : 30px 0px 0px; */
    padding: 30px 0px 30px 60px;
    &:hover {
    background: ${props => props.theme.bg.wash};
    transition: 0.3s;
    border-radius: 10px;
    }
` 
