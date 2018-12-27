import * as React from 'react';
import userContainer from '../../Container/userContainer';
import RankAll from './Rank/index'
import { rankData } from '../../API/fetchAPI';
import { render } from 'react-dom';
// import { isNull } from 'util';
const { useEffect } = React as any

class ListAuthor extends React.Component {
    // const [rankState, setRankState] =  React.useState(null)
    state = {
        rankState: null
    }
    async componentDidMount() {
        const fetchDataRank = await rankData()
        this.setState({ rankState: fetchDataRank })
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