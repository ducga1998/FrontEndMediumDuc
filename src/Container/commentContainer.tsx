import { Container } from 'unstated-x';
import { getAllCommentinArtcileCurrent, addComment } from '../API/commentAPI';
import userContainer from './userContainer';
export interface IArticleContainer {
    isPublicArticle: Boolean
    contentArticle: String
    titleArticle: String

}
let createTime = new Date().toUTCString()
export const registryComment = new Map()
class CommentAllContainer extends Container<any>{
    constructor(state) {
        super(state)
        // fetach all data article


    }

    async addCommentInArticle(input) {
        const { content, idArticle, idUser } = input
        // this is new comment data 
        //request to backend
        // B1 : 
        let { data: {
            addCommentIntoArticle
        } }: any = await addComment(input)
        // B2 : 
        const { registryComment } = this.state
        const data = registryComment.find(comment => comment.idArticle === idArticle) // 
        const { commentContainer } = data // this is all Comment
        const { allComments } = commentContainer.state
        let { name, avatarLink } = userContainer.state.dataUser as any
        addCommentIntoArticle.userComment = {
            avatarLink,
            name,
            idUser
        }
        allComments.push(addCommentIntoArticle)
        console.log(allComments)
        await commentContainer.setState({ allComments })
    }
    // each user 
    async getAllCommentByIdArticle(idArticle) {
        const commentInArticleContainer = new CommentInArticleContainer({
            allComments: [],
            idArticle
        })
        await commentInArticleContainer.getAllCommentByIdArticle(idArticle)
        const input = {
            idArticle,
            commentContainer: commentInArticleContainer
        }
        const { registryComment } = this.state
        if (!registryComment.find(item => item.idArticle === idArticle)) {
            registryComment.push(input)
            this.setState({ registryComment })
        }
    }



}
class CommentInArticleContainer extends Container<any>{
    constructor(data) {
        super(data)
    }
    async getAllCommentByIdArticle(idArticle) {
        const data = await getAllCommentinArtcileCurrent(idArticle)
        if (data) {
            const { data: { getAllCommentInTheArticle } } = data as any
            await this.setState({ allComments: getAllCommentInTheArticle })
        }
    }
}

const commentAllContainer = new CommentAllContainer({
    registryComment: []
})
//debug
window["registryComment"] = registryComment
window['comment'] = commentAllContainer
export default commentAllContainer;