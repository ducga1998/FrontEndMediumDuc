import * as React from 'react';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import UILoading from '../../UI/UILoading';
/* 
        idUser: String
        login: String
        password: String
        decentraliz: Int 
        name: String
        avatarLink: String
        articles: [String]
        bookMark: [String]
        totalFollow: [String]
        followOtherPeople: [String]
*/
interface IViewUserDetail {
    match: any
}
const { useEffect } = React
class ViewUserDetail extends React.Component<IViewUserDetail> {
    state = {
        dataUser: null
    }
    async  componentDidMount() {
        const { match: { params: { id } } } = this.props
        const data = await getAllInformationUser(id)
        // this , beause object in data same name function =.=
        const dataUser = data['data']['getAllInformationUser']
        console.log(dataUser)
        await this.setState({ dataUser })

    }
    //     articles: (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // avatarLink: null
    // idUser: "95d66530-e56a-11e8-b2c5-f1e93ff5b588"
    // name: "NO NAME"
    render() {
        const { dataUser } = this.state
        if (dataUser) {
            const { articles, avatarLink, name } = dataUser as any;
            console.log('articles', articles)
            return <$ArticleDetail>
                <$Content >
                    <Left>
                        <$Author>
                            <img src={avatarLink ? avatarLink : ''} />
                            <h3>{name}</h3>
                            <h5> Article : {articles.length}</h5>
                        </$Author>
                        {/* <Author avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} /> */}
                    </Left>
                    dataArticle
            <Right>


                    </Right>
                </$Content >
                <hr />
                <$ViewArticle>
                    {articles.map((item, key) => {
                        const { hashTag, isUSer, contentArticle, titleArticle, createTime, idArticle, user } = item
                        return <div>
                            {/* <Article user={user} idArticle={idArticle} key={key} hashTag={hashTag} time={createTime} content={contentArticle} totalClap={8} totalComment={9} titleArticle={titleArticle} avatar={`https://picsum.photos/200/200/?a${item}`} /> */}
                            {/* {item.} */}
                        </div>
                    })}
                </$ViewArticle>
            </$ArticleDetail>
        }
        return <UILoading />
    }
}
//"idArticle", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "titleArticle", "imageArticle", "createTime", "__typename"
const $Author = styled.div`
`
const $ArticleDetail = styled.div`
`
const $ViewArticle = styled.div`

`
const $Content = styled.div`
 display : flex;
`
const Left = styled.div`
flex : 5
`
const Right = styled.div`
flex : 6
`
export default ViewUserDetail