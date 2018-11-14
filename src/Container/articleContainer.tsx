import { Container } from 'unstated-x'
import { addArticleToClient } from '../API/client'
import userContainer from './userContainer'
interface dataArticle {
    idUser: String
    idArticle: String
    hashTag: String
    category: String
    comment: String
    totalClap: Number
    // notification: String
}
export interface IArticleContainer {
    isPublicArticle: Boolean
    contentArticle: String
    titleArticle: String

}
class ArticleContainer extends Container<IArticleContainer>{
    async addArticle() {
        const { contentArticle, titleArticle } = this.state

        // if (dataArticle && dataArticle) {
        //     await addArticleToClient(dataArticle)
        // }
    }
}

const articleContainer = new ArticleContainer({
    contentArticle: '',
    titleArticle: '',
    isPublicArticle: false
})
window['article'] = articleContainer
export default articleContainer;