import { Container } from 'unstated-x';
import uuid from 'uuid';
import { updateArticleToClient } from '../API/articleAPI';
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
let createTime = new Date().toUTCString()
class ArticleContainer extends Container<IArticleContainer>{

    async addArticle(hashTag = []) {
        const { contentArticle, titleArticle } = this.state
        const { dataUser } = userContainer.state as any
        const idArticle = uuid()
        if (dataUser) {
            const { idUser } = dataUser
            console.log('run func addArticle')
            return await addArticleToClient({ contentArticle, titleArticle, idUser, idArticle, hashTag, createTime })
        }
    }
    async updateAricle(hashTag = [], idArticle) {
        const { contentArticle, titleArticle } = this.state
        const { dataUser } = userContainer.state as any
        // const idArticle = uuid()
        console.log('idArticle', idArticle)
        if (dataUser) {
            const { idUser } = dataUser
            console.log('run func updateAricle')
            return await updateArticleToClient({ contentArticle, titleArticle, idUser, idArticle, hashTag, createTime })
        }
    }
}
() => {

}
const articleContainer = new ArticleContainer({
    contentArticle: '',
    titleArticle: '',
    isPublicArticle: false,
})

window['article'] = articleContainer
export default articleContainer;