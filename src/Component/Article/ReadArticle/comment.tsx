import * as React from 'react';
import { getAllCommentinArtcileCurrent } from '../../../API/commentAPI';
interface ICommentArticleType {
    idArticle: string
}
export default class CommentArticle extends React.Component<ICommentArticleType> {
    async componentDidMount() {
        const { idArticle } = this.props
        const allComment = await getAllCommentinArtcileCurrent(idArticle)

        console.log('allComment', allComment)
    }
    render() {

        return <div>
        </div>
    }
}