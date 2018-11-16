import { Container } from 'unstated-x';
import uuid from 'uuid';
import { addArticleToClient } from '../API/client';
import userContainer from './userContainer';
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
    async addArticle(hashTag = []) {
        const { contentArticle, titleArticle } = this.state
        const { dataUser } = userContainer.state as any
        const idArticle = uuid()
        if (dataUser) {
            const { idUser } = dataUser
            console.log('OK')
            return await addArticleToClient({ contentArticle, titleArticle, idUser, idArticle, hashTag })
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