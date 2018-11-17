import gql from "graphql-tag";
import { client } from "./client";
export function updateArticleToClient(article: any) {
    console.log('article', article)
    let input: any = article;
    console.log(input)
    return new Promise(resolve => {
        const data = client.mutate({
            mutation: gql`
            mutation UpdateArticle($input : ArticleInput) {
                updateArticle(input : $input) {
                    idUser
                    hashTag
                    category
                    comment
                    totalClap
                    notification
                    createTime
                }
            }
          `,
            variables: {
                input
            }
        })
        resolve(data)
    })
}
//get all article in database
export function getAllArticle() {
    return new Promise(resolve => {
        const data = client.query({
            query: gql`
                    query {
                        getAllArticle( id  : ""){
                            idUser
                    hashTag
                    category
                    comment
                    totalClap
                    notification
                    contentArticle
                    imageArticle
                    titleArticle
                    createTime
                    }
                    }
                    `


        })
        resolve(data)
    })
} 