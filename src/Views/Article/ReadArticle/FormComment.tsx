
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
interface IFormRely {
    context : any ,
    idRely ?:string,
    onChange ?: (event : any) => any
}
const FormRely = ({ context , idRely , onChange }: IFormRely ) => {
    const refContent = React.useRef(null) as any
    const [content, setContent] = React.useState('')
    let { name, avatarLink } = userContainer.state.dataUser
    const { titleArticle, idArticle, idUser } = context
    const handleAddComment = async () => {
        if ( content === '') {
            toast.error('Comment not empty !!!. Please write something ')
            return
        }
        let input = {
            content,
            idUser: userContainer.state.dataUser.idUser,
            idArticle,
            
        } as any
        if(idRely && onChange ){
            console.log('da co id rely ' ,idRely)
            input = {...input , ...{idRely}}
            onChange(input)
        }
        console.log('input when have rely' )
        await commentAllContainer.addCommentInArticle(input) // function handle request to backend and add data to commentAllContainer
        setContent('')
    }
    function handleKeyPress (event) {
        if(event.charCode===13){
            handleAddComment()
        }
        
    }
    return <$Aglin >
        <FlexRow>
            <Avatar className="smallAvatar" src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
        </FlexRow>
        <WrapperFromComment>
            <FormComment placeholder="Comment something ....." value={content} onKeyPress={handleKeyPress} onChange={  e => setContent(e.target.value)}  />
            <UIButton style={{flex : 2}} onMouseDown={handleAddComment} >Comment</UIButton>
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
const FormComment = styled(Input)`
    flex : 10;
`
const $Aglin = styled(FlexCol)`
    background-color  : ${props => props.theme.generic.default};
    padding : 10px;
    border-radius : 20px;
`
export default renderElement(FormRely)