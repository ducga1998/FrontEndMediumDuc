
import UIButton from '../../../Components/UI/UIButton';

import MediumEditer from 'medium-editor'
import * as React from 'react'
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import { Config } from '../../../help/config';
import styled from 'styled-components';

import { toast } from 'react-toastify';
import userContainer from '../../../Container/userContainer';
import { notificationSocket } from '../../../socketClient/socket';
import commentAllContainer from '../../../Container/commentContainer';
import { renderElement } from '../../../Core/renderElement';
import { Input, FlexCol, FlexRow } from '../../../Components/styled/base';
import { AvatarImage } from '../../../Components/styled/avatar';

const FormRely = ({ context }: any) => {
    const refContent = React.useRef(null) as any
    const [content, setContent] = React.useState('')
    let { name, avatarLink } = userContainer.state.dataUser
    const { titleArticle, idArticle, idUser } = context
    const handleAddComment = async () => {
        if ( content === '') {
            toast.error('Comment not empty !!!. Please write something ')
            return
        }
        const input = {
            content,
            idUser: userContainer.state.dataUser.idUser,
            idArticle,
        }
        await commentAllContainer.addCommentInArticle(input) // function handle request to backend and add data to commentAllContainer
        setContent('')
    }
    function handleKeyPress (event) {
        if(event.charCode===13){
            handleAddComment()
        }
        
    }
    return <FlexCol>
        <FlexRow>
            <Avatar className="smallAvatar" src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
        </FlexRow>
        <FlexRow style={{margin  : '0px 0px 20px 0px'}}>
            <FormComment value={content} onKeyPress={handleKeyPress} onChange={  e => setContent(e.target.value)}  />
            <UIButton onMouseDown={handleAddComment} >Comment</UIButton>
        </FlexRow>
    </FlexCol>


}
const Avatar = styled(AvatarImage)`
    margin-right : 20px;
    margin-bottom : 20px;
`
const FormComment = styled(Input)`
`
const $Aglin = styled.div`
    display: flex;
`
export default renderElement(FormRely)