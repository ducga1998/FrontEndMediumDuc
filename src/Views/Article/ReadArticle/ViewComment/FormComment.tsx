
import UIButton from 'src/Components/UI/UIButton';

import * as React from 'react'
import { IMAGE_SOURCE_DEFAULT } from 'src/help/define';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import userContainer from 'src/Container/userContainer';
import { socketNotication } from 'src/socketClient/socket';
import commentAllContainer from 'src/Container/commentContainer';
import { renderElement } from 'src/Core/renderElement';
import { Input, FlexCol, FlexRow } from 'src/Components/styled/base';
import { AvatarImage } from 'src/Components/styled/avatar';
import uuid from 'uuid'
import { addComment } from 'src/API/commentAPI';
interface IFormRely {
    context: any,
    idRely?: string,
    onChange: (event: any) => any
}
const FormComment = ({ context, idRely, onChange }: IFormRely) => {
    const [content, setContent] = React.useState('')
    const { idArticle } = context
    const { avatarLink, name } = userContainer.state.dataUser
    const handleAddComment = async () => {
        if (content === '') {
            toast.error('Comment not empty !!!. Please write something ')
            return
        }
        let input = {
            content,
            idUser: userContainer.state.dataUser.idUser,
            idArticle,

        } as any
        if (idRely && onChange) {
            input = { ...input, ...{ idRely } }
         
        }
        const { user: { idUser  } } = context
        let userComment = context.user
        // socket notification from backend
        socketNotication({ content, idUser }, idRely ? 'RelyComment' : 'Comment')
        let newComment = await addComment(input) ;
        console.log('relyxasx',newComment)
        onChange(newComment)
        setContent('')
    }
    function handleKeyPress(event) {
        if (event.charCode === 13) {
            handleAddComment()
            
        }

    }
    return <$Aglin>
        <div className = "wrapperAvatar">
            <AvatarImage
                src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
        </div>
        <div  className = "wrapperAvatar">
            <$FormComment placeholder="Comment something ....."
                value={content}
                onKeyPress={handleKeyPress}
                onChange={e => setContent(e.target.value)} />
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
    background-color  : ${props => props.theme.generic.default};
    padding : 10px;
    border-radius : 20px;
    .wrapperAvatar {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`
export default renderElement(FormComment)