import UIButton from 'src/Components/UI/UIButton';
import * as React from 'react'
import { IMAGE_SOURCE_DEFAULT } from 'src/help/define';
import styled, { DefaultTheme } from 'styled-components';
import { toast } from 'react-toastify';
import userContainer from 'src/Container/userContainer';
import { socketNotication } from 'src/socketClient/socket';
import { renderElement } from 'src/Core/renderElement';
import { Input, FlexCol } from 'src/Components/styled/base';
import { AvatarImage } from 'src/Components/styled/avatar';
import { addComment, ICommentType } from 'src/API/commentAPI';
import { IArticleType } from 'src/API/articleAPI';
interface IFormReply {
    context: IArticleType,
    idReply?: string,
    onChange: (e) =>  void
}

const FormComment = ({ context, idReply, onChange }: IFormReply) => {
    const [content, setContent] = React.useState('')
    const { idArticle } = context
    const { avatarLink, name , idUser : idUserLogin} = userContainer.state.dataUser
    const handleAddComment = async () => {
        if (content === '') {
            toast.error('Comment not empty !!!. Please write something ')
            return
        }
        let comment = {
            content,
            idUser: idUserLogin,
            idArticle,

        } as ICommentType
        if (idReply && onChange) {
            comment = { ...comment, ...{ idReply } }
        }
        const { user: { idUser } } = context
        // socket notification from backend
        socketNotication({ content, idUser }, idReply ? 'ReplyComment' : 'Comment')
        let newComment = await addComment(comment);
        onChange(newComment)
        setContent('')
    }
    function handleKeyPress(event) {
        if (event.charCode === 13) {
            handleAddComment()
        }
    }
    return <$Aglin>
        <div className="wrapperAvatar">
            <AvatarImage
                src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
        </div>
        <div className="wrapperAvatar">
            <$FormComment placeholder="Comment something ....."
                value={content}
                onKeyPress={handleKeyPress}
                onChange={(e : React.ChangeEvent<HTMLInputElement>  ) => setContent(e.target.value)} />
            <UIButton
                style={{ flex: 2 }}
                onMouseDown={handleAddComment}>Comment
            </UIButton>
        </div>
    </$Aglin>
}

const $FormComment = styled(Input)`
    flex : 10;
`
const $Aglin = styled(FlexCol)`
    background-color  : ${(props ) => props.theme.generic.default};
    padding : 10px;
    border-radius : 20px;
    .wrapperAvatar {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`
export default renderElement(FormComment)