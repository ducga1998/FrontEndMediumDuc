
import { Container } from 'unstated-x';
import { unBookMark, bookMark, isBookMarkToClient } from '../API/bookmarkAPI';
import userContainer from './userContainer';
export interface IBookMark {
    allArticleHasBeenBookMark: any[]

}
class AllBookMarkContainer extends Container<any>{
    constructor(data) {
        super(data)
    }
    // function only run when we into article  has been bookmark   : )) yeahhhh 
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
        this.setState({ allArticleHasBeenBookMark })
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
    findContainerAndSetState(idArticle, flag) {

        const { allArticleHasBeenBookMark } = this.state
        const { bookMarkContainer } = allArticleHasBeenBookMark.find(item => item.idArticle == idArticle)
        bookMarkContainer.setState({ isBookMark: flag })
    }
    async bookMarkToClient({ idArticle, idUseOwnArticler }) {
        const { idUser } = userContainer.state.dataUser
        this.findContainerAndSetState(idArticle, true)
        // const flag = await isBookMarkToClient({ idUser, idArticle })
        bookMark({ idUserBookMark: idUser, idArticle, idUser: idUseOwnArticler })
    }
    async unBookMarkToClient({ idUseOwnArticler, idArticle }) {
        const { idUser } = userContainer.state.dataUser
        this.findContainerAndSetState(idArticle, false)
        unBookMark({ idUserBookMark: idUser, idArticle, idUser: idUseOwnArticler })
    }


}
class BookMarkContainer extends Container<any>{

}

const allBookMarkContainer = new AllBookMarkContainer({
    allArticleHasBeenBookMark: [],
})
//debug
window["bookmark"] = allBookMarkContainer

export default allBookMarkContainer;