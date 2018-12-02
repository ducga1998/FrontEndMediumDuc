import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../../API/followAPI';
import userContainer from '../../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../../UI/UILoading';
import Article from '../../Article';
import followAllContainer from '../../../Container/followContainer';
import { Subscribe } from 'unstated-x';
interface IStories {
    match: any
}
const { useEffect } = React
class Stories extends React.Component<IStories> {
    state = {
        dataUser: null,
        ownProfileId: ''
    }
    async componentDidMount() {
        const { idUser } = userContainer.state.dataUser

        const data = await getAllInformationUser(idUser)
        const dataUser = data['data']['getAllInformationUser']
        await this.setState({ dataUser })
    }

    render() {
        const { ownProfileId, dataUser } = this.state as any
        console.log('state', this.state)
        if (!dataUser) {
            return <UILoading />
        }
        const { articles, avatarLink, name, idUser } = dataUser as any;

        return <$ArticleDetail>
            <h1> All Article {name}</h1>
            <$ViewArticle>
                {articles && articles.length > 0 ? articles.map((item, key) => {
                    const { hashTag, isUSer, contentArticle, titleArticle, createTime, idArticle } = item
                    return <Article typeArticle='store' user={dataUser} idArticle={idArticle} key={key} hashTag={hashTag} time={createTime} content={contentArticle} totalClap={8} totalComment={9} titleArticle={titleArticle} avatar={`https://picsum.photos/200/200/?a${item}`} />

                }) : <h2>NO Article  :), fuck own account stupid </h2>}
            </$ViewArticle>
        </$ArticleDetail>

        // console.log(followContainer)






    }
}
//"idArticle", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "titleArticle", "imageArticle", "createTime", "__typename"
const $ListAvatarUserFollow = styled.div`
    margin : 10px;
    & img {
        width : 40px;
        height : 40px;
        margin-left : 3px;
        border-radius:50%;
    }

`
const Img = styled.img`

width : 200px;
height : 200px;
border-radius : 50%;
`
const $Author = styled.div`
            `
const $ArticleDetail = styled.div`
            `
const $ViewArticle = styled.div`
            border-top  :2px solid #9eaee8;
            padding-top : 20px;
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

export default Stories