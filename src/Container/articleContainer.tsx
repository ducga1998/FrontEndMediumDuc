import { Container } from 'unstated-x'
import { addArticleToClient } from '../API/client'
import userContainer from './userContainer'
import uuid from 'uuid'
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
        const { dataUser } = userContainer.state as any
        const idArticle = uuid()
        if (dataUser) {
            const { idUser } = dataUser
            console.log('OK')
            await addArticleToClient({ contentArticle, titleArticle, idUser, idArticle })
        }
    }
}

const articleContainer = new ArticleContainer({
    contentArticle: '',
    titleArticle: '',
    isPublicArticle: false
})
window['article'] = articleContainer
export default articleContainer;