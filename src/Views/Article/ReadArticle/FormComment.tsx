
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
import { input } from '../../../Components/styled/input';

const FormRely = ({ context }: any) => {
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
        await commentAllContainer.addCommentInArticle(input) // function handle request to backend and add data to commentAllContainer
        setContent('')
        refContent.current.innerHTML = '<p><br /></p>'
    }
    return <$Aglin>
        <img className="smallAvatar" src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
        <div ref={refContent} />
        <UIButton onMouseDown={handleAddComment} >Comment</UIButton>
    </$Aglin>


}
const $Aglin = styled(input)`
    display: flex;


`
export default renderElement(FormRely)