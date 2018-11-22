import {Container} from 'unstated-x';
import uuid from 'uuid';
import {updateArticleToClient} from '../API/articleAPI';
import {addArticleToClient} from '../API/client';
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

export interface IArticleContainerState {
    contentArticle: string;
    titleArticle: string;
}

const createTime = new Date().toUTCString();

class ArticleContainer extends Container<IArticleContainerState> {

    async addArticle(hashTag = []) {
        const {contentArticle, titleArticle} = this.state;
        const {dataUser} = userContainer.state;
        const idArticle = uuid();
        if (dataUser) {
            const {idUser} = dataUser;
            console.log('run func addArticle');
            return await addArticleToClient({contentArticle, titleArticle, idUser, idArticle, hashTag, createTime})
        }
    }

    async updateAricle(hashTag = [], idArticle) {
        const {contentArticle, titleArticle} = this.state;
        const {dataUser} = userContainer.state;
        // const idArticle = uuid()
        console.log('idArticle', idArticle);
        if (dataUser) {
            const {idUser} = dataUser
            console.log('run func updateAricle');
            return await updateArticleToClient({contentArticle, titleArticle, idUser, idArticle, hashTag, createTime})
        }
    }
}

const articleContainer = new ArticleContainer({
    contentArticle: '',
    titleArticle: '',
    isPublicArticle: false,
});

window['article'] = articleContainer;
export default articleContainer;