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
    isUpdate: Boolean,
    newArticle: any
}
let createTime = new Date().toUTCString()
class ArticleContainer extends Container<IArticleContainer>{
    //   =>   request to back end 
    //  => front end alway have stories
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
        if (dataUser) {
            const { idUser } = dataUser
            return await updateArticleToClient({ contentArticle, titleArticle, idUser, idArticle, hashTag, createTime })
        }
    }
}
const articleContainer = new ArticleContainer({
    contentArticle: '',
    titleArticle: '',
    isPublicArticle: false,
    isUpdate: false,
    newArticle: {}
})

window['article'] = articleContainer
export default articleContainer;