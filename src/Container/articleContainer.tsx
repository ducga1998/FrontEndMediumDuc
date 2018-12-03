import { Container } from 'unstated-x';
import uuid from 'uuid';
import { updateArticleToClient, getAllArticle } from '../API/articleAPI';
import { addArticleToClient } from '../API/client';
import userContainer from './userContainer';
import omit from 'lodash/omit'
interface dataArticle {
    idUser: String
    idArticle: String
    hashTag: String
    category: String
    comment: String
    totalClap: Number
    // notification: String
}

let createTime = new Date().toUTCString()
//  when public article then will two action  
// B1 : add article in registryArticle
// B2 : send request server
const registry = new Map()

class AllArticleContainer extends Container<any> {
    constructor(state) {
        super(state)
        state = {
            registryArticle: []
        }
        this.fetchData()
    }
    async fetchData() {
        const dataFake = await getAllArticle()
        // console.log('dataFake', dataFake)
        if (dataFake) {

            const { data: { getAllArticle } } = dataFake as { data: { getAllArticle: any[] } }
            const listContainer = getAllArticle.map(item => {
                // const data = omit(item, ['comment'])
                const articleContainer = new Article(item)
                const { idArticle } = item
                return {
                    articleContainer,
                    idArticle
                }
            })

            this.setState({ registryArticle: listContainer })
        }
    }
    // addArticle will structure  {
    addArticle() {

        //add article in registryArticle 

    }
}
export const allArticleContainer = new AllArticleContainer({
    registryArticle: []
})
class Article extends Container<any> {

}

window['allArticleContainer'] = allArticleContainer
export interface IArticleContainer {
    isPublicArticle: Boolean
    contentArticle: String
    titleArticle: String
    isUpdate: Boolean,
    newArticle: any,
    idArticleNeedUpdate: String,
    arrHashTag: any
}
class ArticleContainer extends Container<IArticleContainer>{
    //   =>   request to back end 
    //  => front end alway have stories
    async addArticle(idArticle) {
        const { contentArticle, titleArticle, arrHashTag } = this.state
        const { dataUser } = userContainer.state as any

        if (dataUser) {
            const { idUser } = dataUser
            console.log('run func addArticle')
            return await addArticleToClient({ contentArticle, titleArticle, idUser, idArticle, hashTag: arrHashTag, createTime })
        }
    }
    async updateAricle(idArticle) {
        const { contentArticle, titleArticle, arrHashTag } = this.state
        const { dataUser } = userContainer.state as any
        // const idArticle = uuid()
        if (dataUser) {
            const { idUser } = dataUser
            console.log('input final', { contentArticle, titleArticle, idUser, idArticle, hashTag: arrHashTag, createTime })
            return await updateArticleToClient({ contentArticle, titleArticle, idUser, idArticle, hashTag: arrHashTag, createTime })
        }
    }
}

const articleContainer = new ArticleContainer({
    contentArticle: '',
    titleArticle: '',
    isPublicArticle: false,
    isUpdate: false,
    idArticleNeedUpdate: '',
    arrHashTag: []
})

window['article'] = articleContainer
export default articleContainer;