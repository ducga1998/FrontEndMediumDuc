import MediumEditer from 'medium-editor';
import * as React from 'react';
import styled from 'styled-components';
import { getAllCommentinArtcileCurrent } from '../../../API/commentAPI';
import UIButton from '../../../UI/UIButton';
import { Config } from '../WriteArticle/index';
const config = Config('Comment something now  . . . . . . . ')
const IMAGE_SOURCE_DEFAULT = 'https://scontent.fhan5-2.fna.fbcdn.net/v/t1.0-9/30710734_1894791530812895_692578444441026560_n.jpg?_nc_cat=102&_nc_ht=scontent.fhan5-2.fna&oh=46b63236752f0608bb45efcd83a59d05&oe=5C75BB19'
interface ICommentArtiwriteCommentcleType {
    idArticle: string,
    imgSrc?: any,
    name: string
}
export default class WriteComment extends React.Component<ICommentArtiwriteCommentcleType> {
    state = {
        content: ''
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
    render() {
        const { imgSrc, name } = this.props
        return <>< $Comment>
            <$Img src={imgSrc ? imgSrc : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
            <$Content ref={this.refComment} />
            <UIButton onChange={() => {
                console.log(this.state.content)

            }} >Comment</UIButton>
        </$Comment>
        </>
    }
}

const $Content = styled.div`
    &:focus {
    background-color: #c3c0c0;
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
