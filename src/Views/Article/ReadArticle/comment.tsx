import * as React from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
// import { FormComment } from './writeComment';
import { Subscribe } from 'unstated-x';
import commentAllContainer from '../../../Container/commentContainer';
import UILoading from '../../../Components/UI/UILoading';
import { Config } from '../../../help/config';
import MediumEditer from 'medium-editor';
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import FormComment from './FormComment';
import { AvatarImage } from '../../../Components/styled/avatar';
import { H2 } from '../../../Components/styled/base';
import userContainer from '../../../Container/userContainer';
interface IViewComment {
    idArticle: string,

}
export default class ViewComment extends React.Component<IViewComment> {

    render() {

        return <Subscribe to={[commentAllContainer]}>
            {
                () => {
                    const { idArticle } = this.props
                    const data = commentAllContainer.state.registryComment.find(item => item.idArticle === idArticle)
                    if (!data) {
                        return <UILoading />
                    }
                    const { commentContainer } = data
                    return <Subscribe to={[commentContainer]}>
                        {
                            () => {
                                const { allComments } = commentContainer.state
                                return <WrapperComment>
                                    {allComments.length > 0 ? allComments.map((item: any, key) => {
                                        const { idRely } = item
                                        let dataRely
                                        if (!idRely) {
                                            // loop all comment, find idComment  === idRely 
                                            dataRely = allComments.filter(comment => {
                                                if (comment.idRely) {
                                                    return comment.idRely === item.idComment
                                                }
                                            })
                                        }
                                        return <Comment dataUserComment={item} relyComment={dataRely && dataRely.length > 0 ? dataRely : undefined} />
                                    }) :
                                        <H2 style={{ textAlign: 'center', color: 'gray' }}> NO  Comment,  : ))) cmt vào cho vui đi thằng ngu</H2>
                                    }
                                </WrapperComment>
                            }
                        }
                    </Subscribe>
                }
            }
        </Subscribe>

    }
}
// comment only comment => we handle data coment a here
const WrapperComment = styled.div`

`
const Comment = ({ dataUserComment, relyComment }: { dataUserComment: any, relyComment?: any }) => {
    const [open, setOpen] = React.useState(false)
    const [dataRely, setDataRely] = React.useState(relyComment ? relyComment : [])
    //    console.log('dataRelydataRely',dataRely)
    function renderCommentRely(commentRely: any) {
        return commentRely.map(comment => {
            const { userComment: { avatarLink, name }, createdAt, content, idComment } = comment
            return <$Comment data-id={idComment} data-tooltip={`Created At : ${new Date(createdAt)}`}>
                <b>  ---- </b>
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
    padding: 30px;
    &:hover {
    background: ${props => props.theme.bg.wash};
    transition: 0.3s;
    border-radius: 10px;
    }
`