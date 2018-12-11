import MediumEditer from 'medium-editor';
import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
// import { addComment, getAllCommentinArtcileCurrent } from '../../../API/commentAPI';
import userContainer from '../../../Container/userContainer';
import UIButton from '../../../UI/UIButton';

import commentAllContainer from '../../../Container/commentContainer';
import { notificationSocket } from '../../../socketClient/socket';
import { Config } from '../../../help/config';
import { input } from '../../../UI/styled/input';
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
const config = Config('Comment something now  . . . . . . . ')

interface IWriteComment {
    idArticle: string,
    imgSrc?: any,
    name: string,
    idUser: string,
    onChange: (e: any) => any
    titleArticle?: string

}
export default class WriteComment extends React.Component<IWriteComment> {
    state = {
        content: '',
    }
    refComment: any = React.createRef()
    async componentDidMount() {
        const { idArticle, idUser } = this.props

        commentAllContainer.getAllCommentByIdArticle(idArticle)
        // console.log('allComment', allComment)
        notificationSocket.emit('join', idUser)
        const title = new MediumEditer(this.refComment.current, config)
        title.subscribe('editableInput', (event, editable) => {
            const content = event.srcElement.innerHTML
            this.setState({ content })
        });

    }
    componentWillUnmount() {
        if (this.props.idUser !== userContainer.state.dataUser.idUser) {
            notificationSocket.emit('leave', this.props.idUser)
        }
    }

    handleAddComment = async () => {
        const { idArticle, titleArticle } = this.props
        const { content } = this.state

        if (content === ' <p><br></p>' || content === '') {
            toast.error('Comment not empty !!!. Please write something ')
            return
        }
        let { idUser, name, avatarLink } = userContainer.state.dataUser
        const input = {
            content,
            idUser,
            idArticle,
        }
        // this.props.idUser  != userContainer.state.dataUser.idUser

        const commentSocket = {
            titleArticle,
            content,
            name,
            type: 'Comment',
            avatarLink
        }
        // must take idUser comment =>  this.props.isUser
        notificationSocket.emit('notificationMessage', this.props.idUser, commentSocket)
        await commentAllContainer.addCommentInArticle(input) // function handle request to backend and add data to commentAllContainer
        await this.setState({ content: '' })
        this.refComment.current.innerHTML = '<p><br /></p>'
    }
    render() {
        const { avatarLink } = userContainer.state.dataUser

        // here view user write comment 
        return <FormComment onMouseDown={this.handleAddComment} refContent={this.refComment} avatarLink={avatarLink} />
    }
}

export const FormComment = ({ onMouseDown, refContent, avatarLink }: any) => {
    return <div>
        <img className="smallAvatar" src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
        <$Content ref={refContent || undefined} />
        <UIButton onMouseDown={onMouseDown} >Comment</UIButton>
    </div>
}

const $Content = styled(input)`
`

