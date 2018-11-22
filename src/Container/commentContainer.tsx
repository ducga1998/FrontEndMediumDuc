import {Container} from 'unstated-x';

export interface IArticleContainer {
    isPublicArticle: Boolean
    contentArticle: String
    titleArticle: String

}

let createTime = new Date().toUTCString()

class CommentContainer extends Container<any> {
    y


}

() => {

}
const articleContainer = new CommentContainer({})

window['article'] = articleContainer
export default articleContainer;