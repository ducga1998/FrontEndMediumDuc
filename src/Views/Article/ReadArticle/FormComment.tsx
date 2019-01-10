
import UIButton from '../../../Components/UI/UIButton';

import * as React from 'react'
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import userContainer from '../../../Container/userContainer';
import { socketNotication } from '../../../socketClient/socket';
import commentAllContainer from '../../../Container/commentContainer';
import { renderElement } from '../../../Core/renderElement';
import { Input, FlexCol, FlexRow } from '../../../Components/styled/base';
import { AvatarImage } from '../../../Components/styled/avatar';
import uuid from 'uuid'
import { addComment } from '../../../API/commentAPI';
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
        const { user: { idUser } } = context
        // socket notification from backend
        socketNotication({ content, idUser }, idRely ? 'RelyComment' : 'Comment')
        setContent('')
        const idComment = uuid()
        let newComment = await addComment({...input , ...{idComment}}) as any
        console.log('newComment',newComment)
        newComment = {
            ...newComment ,...{userComment : {avatarLink,name}}
        }

        onChange(newComment)
    }
    function handleKeyPress(event) {
        if (event.charCode === 13) {
            handleAddComment()
        }

    }
    return <$Aglin >
        <FlexRow>
            <Avatar
                className="smallAvatar"
                src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}
            </b>
        </FlexRow>
        <WrapperFromComment>
            <$FormComment placeholder="Comment something ....."
                value={content}
                onKeyPress={handleKeyPress}
                onChange={e => setContent(e.target.value)} />
            <UIButton
                style={{ flex: 2 }}
                onMouseDown={handleAddComment}>Comment
            </UIButton>
        </WrapperFromComment>
    </$Aglin>


}
const WrapperFromComment = styled(FlexRow)`
    margin  : 0px 0px 20px 0px; 
`
const Avatar = styled(AvatarImage)`
    margin-right : 20px;
    margin-bottom : 20px;
`
const $FormComment = styled(Input)`
    flex : 10;
`
const $Aglin = styled(FlexCol)`
    background-color  : ${props => props.theme.generic.default};
    padding : 10px;
    border-radius : 20px;
`
export default renderElement(FormComment)