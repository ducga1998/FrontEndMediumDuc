import * as React from 'react';
import styled from 'styled-components';
import Article from '../Article';
// import Footer from './footer'

export default function ListArticle() {
    // React.useEffect(async () => {

    //     return await getAllArticle()
    // })
    return <$ListArticle>{[2, 3, 4, 5, 6, 7, 2].map(item => {
        return <Article hashTag={[{ name: "cascascas" }]} time="sacasc" content="cascas" totalClap={8} totalComment={9} titleArticle="cascasc" avatar={`https://picsum.photos/200/200/?a${item}`} />
    })}</$ListArticle>
}
const $ListArticle = styled.div`
    overflow : scroll;
`