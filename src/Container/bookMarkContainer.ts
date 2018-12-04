
import { Container } from 'unstated-x';
import { unBookMark, getAllArticleHashBeenBookMark, bookMark, isBookMarkToClient } from '../API/bookmarkAPI';
import userContainer from './userContainer';
export interface IBookMark {


}
class AllBookMarkContainer extends Container<any>{
    constructor(data) {
        super(data)
    }
    get idUser() {
        console.log(' userContainer.state.dataUser', userContainer.state.dataUser)
        const { dataUser } = userContainer.state
        if (dataUser) {
            return dataUser.idUser
        }

    }
    // function only run when we into article  has been bookmark   : )) yeahhhh 
    async getAllArticeBookMark() {
        const { dataUser } = userContainer.state
        if (dataUser && dataUser.idUser) {
            const { idUser } = dataUser

        }

    }
    async bookMarkToClient({ idArticle, idUseOwnArticler }) {
        const { idUser } = userContainer.state.dataUser
        const { allArticleHasBeenBookMark } = this.state
        const {bookMarkContainer} = allArticleHasBeenBookMark.find(item => item.idArticle == idArticle)
        bookMarkContainer.setState({ isBookMark: true })
        // const flag = await isBookMarkToClient({ idUser, idArticle })
        bookMark({ idUserBookMark: idUser, idArticle, idUser: idUseOwnArticler })
    }
    async isBookMark({ idArticle }) {
        const { idUser } = userContainer.state.dataUser
        const flag = await isBookMarkToClient({ idUser, idArticle }) as boolean
        const bookMarkContainer = new BookMarkContainer({ isBookMark: flag });
        const input = {
            idArticle,
            bookMarkContainer
        }
        const { allArticleHasBeenBookMark } = this.state
        allArticleHasBeenBookMark.push(input)
        this.setState(allArticleHasBeenBookMark)
        console.log('flag', flag)
        return flag

    }
    getContainerBookMark(idArticle) {
        const { allArticleHasBeenBookMark } = this.state
        const data = allArticleHasBeenBookMark.find(item => item.idArticle === idArticle)
        if (data) {
            return data.bookMarkContainer
        }
        return null
    }
    async unBookMarkToClient({ idUseOwnArticler, idArticle }) {
        const { idUser } = userContainer.state.dataUser
        const { allArticleHasBeenBookMark } = this.state
        const {bookMarkContainer} = allArticleHasBeenBookMark.find(item => item.idArticle == idArticle)
        bookMarkContainer.setState({ isBookMark: false })
        unBookMark({ idUserBookMark: idUser, idArticle, idUser: idUseOwnArticler })
    }


}
class BookMarkContainer extends Container<any>{

}

const allBookMarkContainer = new AllBookMarkContainer({
    allArticleHasBeenBookMark: [],
    bookMark: true
})
//debug
window["bookmark"] = allBookMarkContainer

export default allBookMarkContainer;