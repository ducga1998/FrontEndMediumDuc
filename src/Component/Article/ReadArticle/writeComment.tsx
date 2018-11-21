import MediumEditer from 'medium-editor';
import * as React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addComment, getAllCommentinArtcileCurrent } from '../../../API/commentAPI';
import userContainer from '../../../Container/userContainer';
import UIButton from '../../../UI/UIButton';
import { Config } from '../WriteArticle/index';
const config = Config('Comment something now  . . . . . . . ')
export const IMAGE_SOURCE_DEFAULT = 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-9/30710734_1894791530812895_692578444441026560_n.jpg?_nc_cat=102&_nc_ht=scontent.fhan5-2.fna&oh=46b63236752f0608bb45efcd83a59d05&oe=5C75BB19'
interface IWriteComment {
    idArticle: string,
    imgSrc?: any,
    name: string,
    idUser: string,
    onChange: (e: any) => any
}
export default class WriteComment extends React.Component<IWriteComment> {
    state = {
        content: '',
    }
    refComment: any = React.createRef()
    async componentDidMount() {
        const { idArticle } = this.props

        const allComment = await getAllCommentinArtcileCurrent(idArticle)
        console.log('allComment', allComment)
        const title = new MediumEditer(this.refComment.current, config)
        title.subscribe('editableInput', (event, editable) => {
            console.log('casc', event.srcElement.innerHTML)
            const content = event.srcElement.innerHTML
            console.log('cotent', content)
            this.setState({ content })

        });
    }
    handleAddComment = async () => {

        // console.log(this.state.content)
        const { imgSrc, idArticle } = this.props
        const { content } = this.state
        if (content === ' <p><br></p>' || content === '') {
            toast.error('Comment not empty !!!. Please write something ')
            return
        }
        const { idUser, name, avatarLink } = userContainer.state
        const input = {
            content,
            idUser,
            idArticle,

        }
        console.log('content', content)

        let { data: {
            addCommentIntoArticle
        } }: any = await addComment(input)
        let newComment = addCommentIntoArticle
        newComment.userComment = {
            avatarLink,
            name
        }

        console.log('newComment', newComment)
        await this.props.onChange(newComment)
        this.refComment.current.innerHTML = ''
    }
    render() {
        const { idUser, idArticle } = this.props
        const { name, avatarLink } = userContainer.state
        return <>< $Comment>
            <$Img src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
            <$Content ref={this.refComment} />
            <UIButton onChange={this.handleAddComment} >Comment</UIButton>
        </$Comment>
        </>
    }
}

const $Content = styled.div`
    &:focus {
    background-color: #f3f3f3;
    transition: 0.5s;
    outline: none;
    border-radius: 10px;
    color: black;
    padding: 30px;
    font-size: 20px;
    }
    & {
        margin-bottom : 10px;
        transition: 0.5s;
    }
`
const $Img = styled.img`

`
const $Comment = styled.div`
    img {
        width : 50px;
        height : 50px;
        border-radius : 50%;
    }
   
`
