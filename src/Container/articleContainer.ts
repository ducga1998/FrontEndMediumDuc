import { Container } from 'unstated-x';
import { updateArticleToClient, getAllArticle, countArticle, IArticleType } from '../API/articleAPI';
import { addArticleToClient } from '../API/articleAPI';
import userContainer from './userContainer';
interface IAllArticleContainer {
    registryArticle: {
        articleContainer: Article,
        idArticle: string
    }[],
    first: number,
    offset: number,
    count: number,
}

let createTime = new Date().toUTCString()
//  when public article then will two action  
// B1 : add article in registryArticle
// B2 : send request server
const cacheArticle = new Map()

class AllArticleContainer<State extends IAllArticleContainer> extends Container<IAllArticleContainer> {
    constructor(state: State) {
        super(state)
        const { offset, first } = this.state
        this.fetchData(first, offset)
    }
    async fetchData(first: number, offset: number) {
        const dataCache = cacheArticle.get(offset);
        if (dataCache) {
            this.setState({ registryArticle: dataCache })
            return;
        }
        const allArticle = await getAllArticle(first, offset)
        const count = await countArticle() as number
        // console.log('dataFake', dataFake)
        if (allArticle) {
            console.log('allArticle', allArticle)
            const listContainer = allArticle.map(item => {
                // const data = omit(item, ['comment'])
                const articleContainer = new Article(item) as Article
                const { idArticle } = item
                return {
                    articleContainer,
                    idArticle
                }
            })
            cacheArticle.set(offset, listContainer)
            await this.setState({ registryArticle: listContainer, count })
        }
    }
}
export const allArticleContainer = new AllArticleContainer({
    registryArticle: [],
    first: 8,
    offset: 0,
    count: 0,
    vectical: false
})
class Article extends Container<IArticleType> {

}

window['allArticleContainer'] = allArticleContainer
export interface IArticleContainer {
    isPublicArticle: Boolean
    contentArticle: String
    titleArticle: String
    isUpdate: Boolean,
    newArticle: any,
    idArticleNeedUpdate: String,
    arrHashTag: any,
    imageArticle: string
}
export class ArticleContainer extends Container<IArticleContainer>{
    //  =>   request to back end 
    //  => front end alway have stories
    async addArticle(idArticle) {
        const { contentArticle, titleArticle, arrHashTag, imageArticle } = this.state
        const { dataUser } = userContainer.state 

        if (dataUser) {
            const { idUser } = dataUser
            return await addArticleToClient({ imageArticle, contentArticle, titleArticle, idUser, idArticle, hashTag: arrHashTag, createTime })
        }
    }
    async updateAricle(idArticle) {
        // => create hash  
        // idHashTag, idArticle  , nameArticle
        const { contentArticle, titleArticle, arrHashTag, imageArticle } = this.state
        const { dataUser } = userContainer.state 
        // const idArticle = uuid()
        if (dataUser) {
            const { idUser } = dataUser
            return await updateArticleToClient({ contentArticle, titleArticle, idUser, idArticle, hashTag: arrHashTag, createTime, imageArticle })
        }
    }

}


const articleContainer = new ArticleContainer({
    contentArticle: '',
    titleArticle: '',
    imageArticle: '',
    isPublicArticle: false,
    isUpdate: false,
    idArticleNeedUpdate: '',
    arrHashTag: []
})

window['article'] = articleContainer
export default articleContainer;