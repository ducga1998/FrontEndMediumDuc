
import { IArticleType } from './articleAPI';
import { IHashtTagType } from './hashtagAPI';
import { IFollowType } from './followAPI';
// this is here query api speacil data in backend
// All API Rank 
export interface Irank {
    rankCountBookMarkArticle  :(IArticleType & {count : number})[]
     rankFollow  : (IFollowType &  {count : number})[]
     rankCountWriteArticle : (IArticleType & {count : number}) []
}
export const rankData = async ()  => {
    return await fetch('/api/rank').then(data => data.json())
}

export const hashTagData = async () : Promise<IHashtTagType[]> => {
    return await fetch('/api/hashtag').then(data => data.json())
}
// something api