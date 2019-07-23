import * as React from 'react';
import styled from 'styled-components';
import ListArticle from '../Reuse/ArticleView/ListArticle';
import Pagination from '../pagination';
import Rank from './Rank';
import { Subscribe } from 'unstated-x';
import { allArticleContainer } from 'Container/articleContainer';
// return <Subscribe to={[allArticleContainer]}>
// {
//     container => {
//         const { registryArticle , vectical  } = container.state

//         return <$ListArticle>
//         {
//             registryArticle.length > 0 ? registryArticle.map((item: any, key) => {
//                 const { articleContainer } = item
//                 return <Subscribe   key={key} to={[articleContainer]}>
//                     {
//                         () => { 
//                             return <Article vectical={vectical}  article ={articleContainer.state}/>
//                         }
//                     }
//                 </Subscribe>
//             }) : <h1>No article</h1>
//         }</$ListArticle>
//     }
// }
// </Subscribe>
export default function Home() {
    return <WrapperHome>
        <div className="md-list-article">
            <Pagination />
            <Subscribe to={[allArticleContainer]}>
            {
                container => {
                    const {registryArticle , vectical} = container.state
                    return    <ListArticle listArticle={registryArticle} direction={vectical} />
                }
                    
            }
            </Subscribe>
         
        </div>
        <div className ="md-list-rank">
            <Rank  />
        </div>
    </WrapperHome>
}

const WrapperHome = styled.div`
display : flex;
width : 100%;
.md-list-article{
    flex : 9;
    height  : 100%;
    overflow-y: scroll;
}
.md-list-rank {
    flex : 3;
}
`

