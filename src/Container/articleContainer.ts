import { Container } from 'unstated-x';
import uuid from 'uuid';
import { updateArticleToClient, getAllArticle, countArticle } from '../API/articleAPI';
import { addArticleToClient } from '../API/client';
import userContainer from './userContainer';
import omit from 'lodash/omit'
interface IAllArticleContainer {
    registryArticle: any[],
    first: number,
    offset: number,
    count: number
    // notification: String
}

let createTime = new Date().toUTCString()
//  when public article then will two action  
// B1 : add article in registryArticle
// B2 : send request server
const cacheArticle = new Map()

class AllArticleContainer extends Container<IAllArticleContainer> {
    constructor(state) {
        super(state)
        const { offset, first } = this.state
        this.fetchData(first, offset)
    }
    async fetchData(first, offset) {
        const dataCache = cacheArticle.get(offset)
        if (dataCache) {
            this.setState({ registryArticle: dataCache })
            return
        }
        const allArticle = await getAllArticle(first, offset) as any
        const count = await countArticle() as number
        // console.log('dataFake', dataFake)
        if (allArticle) {
            console.log('allArticle', allArticle)
            const listContainer = allArticle.map(item => {
                // const data = omit(item, ['comment'])
                const articleContainer = new Article(item)
                const { idArticle } = item
                return {
                    articleContainer,
                    idArticle
                }
            }) as any[]
            cacheArticle.set(offset, listContainer)
            await this.setState({ registryArticle: listContainer, count })
        }
    }
    // addArticle will structure  {
    addArticle() {

        //add article in registryArticle 

    }
}
export const allArticleContainer = new AllArticleContainer({
    registryArticle: [],
    first: 5,
    offset: 0,
    count: 0

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