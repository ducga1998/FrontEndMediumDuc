
import UIButton from '../../../Components/UI/UIButton';

import MediumEditer from 'medium-editor'
import * as React from 'react'
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import { Config } from '../../../help/config';
import styled from 'styled-components';

import { ArticleContext } from 'src/Views/Article/ReadArticle';
import { toast } from 'react-toastify';
import userContainer from '../../../Container/userContainer';
import { notificationSocket } from '../../../socketClient/socket';
import commentAllContainer from '../../../Container/commentContainer';
import { renderElement } from '../../../Core/renderElement';
import { Input } from '../../../Components/styled/base';
const FormComment = ({ context }: any) => {
    const refContent = React.useRef(null) as any
    const [content, setContent] = React.useState('')
    let { name, avatarLink } = userContainer.state.dataUser
    const { titleArticle, idArticle, idUser } = context
    React.useEffect(() => {
        if (refContent.current) {
            const title = new MediumEditer(refContent.current, Config)

            title.subscribe('editableInput', event => {
                setContent(event.srcElement.innerHTML)
            });
        }
    })
    const handleAddComment = async () => {

        if (content === ' <p><br></p>' || content === '') {
            toast.error('Comment not empty !!!. Please write something ')
            return
        }
        

        const input = {
            content,
            idUser: userContainer.state.dataUser.idUser,
            idArticle,
        }

        const commentSocket = {
            titleArticle,
            content,
            name,
            type: 'Comment',
            avatarLink
        }
        // must take idUser comment =>  this.props.isUser
        notificationSocket.emit('notificationMessage', idUser, commentSocket)
        await commentAllContainer.addCommentInArticle(input) // function handle request to backend and add data to commentAllContainer
        setContent('')
        refContent.current.innerHTML = '<p><br /></p>'
    }
    return <div>
        <img className="smallAvatar" src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
        <$Content ref={refContent} />
        <UIButton onMouseDown={handleAddComment} >Comment</UIButton>
    </div>


}
const $Content = styled(Input)`
`
export default renderElement(FormComment)