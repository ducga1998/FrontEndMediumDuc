import * as React from 'react';
import RankAll from './Rank/index'
import { rankData } from '../../API/fetchAPI';
const cachRank  = new Map()
class ListAuthor extends React.Component {
    // const [rankState, setRankState] =  React.useState(null)
    state = {
        rankState: null
    }
    async componentDidMount() {
        if(cachRank.get('cache')){
            this.setState({ rankState: cachRank.get('cache') })
            return
        }
        const fetchDataRank = await rankData()
       
        cachRank.set('cache' , fetchDataRank)
        this.setState({rankState :fetchDataRank })
       
    }
    //name, totalFollow, totalArticle, avatarLink, idUser


    render() {
        const { rankState } = this.state
        if (!rankState) {
            return null

           
        }
        return <RankAll rankState={rankState} />

    }
}
export default ListAuthor