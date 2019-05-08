import { IHashtTagType } from './hashtagAPI';
// this is here query api speacil data in backend
// All API Rank 
export const rankData = async ()  => {
    return await fetch('/api/rank').then(data => data.json())
}

export const hashTagData = async () : Promise<IHashtTagType[]> => {
    return await fetch('/api/hashtag').then(data => data.json())
}
// something api