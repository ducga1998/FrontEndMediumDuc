
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
    }
    addRely(input, idrely) {

    }
    async addCommentInArticle(input) {
        const { content, idArticle, idUser } = input
        // this is new comment data 
        //request to backend
        // B1 : 
        let newComment = await addComment(input) as any
        // B2 :  add to container on front end
        const { registryComment } = this.state
        const data = registryComment.find(comment => comment.idArticle === idArticle) // 
        const { commentContainer } = data // this is all Comment
        const { allComments } = commentContainer.state
        let { name, avatarLink } = userContainer.state.dataUser as any
        newComment.userComment = {
            avatarLink,
            name,
            idUser
        }
        allComments.push(newComment)
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
        const allComments = await getAllCommentinArtcileCurrent(idArticle)
        if (allComments) {

            await this.setState({ allComments })
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