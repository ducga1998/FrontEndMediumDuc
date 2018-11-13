import { Container } from 'unstated-x'
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
    dataArticle: dataArticle
}
class ArticleContainer extends Container<IArticleContainer>{

}

const articleContainer = new ArticleContainer({
    dataArticle: null,
    isPublicArticle: Boolean
})
export default articleContainer;