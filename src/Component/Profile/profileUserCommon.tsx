import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../UI/UILoading';
import Article from '../Article';
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
        dataUser: null,
        dataUserFollow: [],
        isFollow: false
    }
    async componentDidMount() {
        const { match: { params: { id } } } = this.props
        const data = await getAllInformationUser(id)
        // get all information user has been follow
        const dataFollow = await getAllInfomationUserFollowYour(id)
        const dataUserFollow = dataFollow['data']['getAllInfomationUserFollowYour'] as any[]
        console.log('dataUserFollow', dataUserFollow)
        // this , beause object in data same name function =.=
        const dataUser = data['data']['getAllInformationUser']
        console.log('dataUserFollow', dataUserFollow)
        if (dataUserFollow && dataUserFollow.length > 0) {
            this.setState({ isFollow: true })
        }
        await this.setState({ dataUser, dataUserFollow })
    }
    //     articles: (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // avatarLink: null
    // idUser: "95d66530-e56a-11e8-b2c5-f1e93ff5b588"
    // name: "NO NAME"
    async follow(idUser) {
        const idUserFollow = userContainer.state.dataUser.idUser
        await this.setState({ isFollow: true })
        await follow({ idUser, idUserFollow })
    }
    async unfollow(idUser) {
        const idUserFollow = userContainer.state.dataUser.idUser
        await this.setState({ isFollow: false })
        await unFollow({ idUser, idUserFollow })
    }
    render() {
        const { dataUser, isFollow, dataUserFollow } = this.state
        if (dataUser) {
            const { articles, avatarLink, name, idUser } = dataUser as any;
            console.log('articles', articles)
            return <$ArticleDetail>
                <$Content >
                    <Left>
                        <$Author>
                            <Img src={avatarLink ? avatarLink : srcImg} />
                            <h3>{name}</h3>
                            <h5> Article : {articles.length}</h5>
                        </$Author>
                        {/* <Author avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} /> */}
                    </Left>

                    <Right>
                        {isFollow ? <Button bsStyle="danger" onClick={async () => { await this.unfollow(idUser) }}>Unfollow</Button> : <Button bsStyle="info" onClick={async () => { await this.follow(idUser) }}> Follow </Button>}

                        {dataUserFollow && dataUserFollow.length > 0 ? <$ListAvatarUserFollow>
                            {dataUserFollow.map((item: any, key) => {
                                const { avatarLink, name } = item.userFollow
                                return <img data-tooltip={name} src={`${avatarLink ? avatarLink : srcImg}`} />
                            })}

                        </$ListAvatarUserFollow> : "No user Follow :(("}
                    </Right>
                </$Content >
                <hr />
                <h3> All Article <b style={
                    {
                        color: "#4797db"
                    }
                } >{name} </b> has write</h3>
                <$ViewArticle>
                    {articles && articles.length > 0 ? articles.map((item, key) => {
                        const { hashTag, isUSer, contentArticle, titleArticle, createTime, idArticle } = item
                        return <Article user={dataUser} idArticle={idArticle} key={key} hashTag={hashTag} time={createTime} content={contentArticle} totalClap={8} totalComment={9} titleArticle={titleArticle} avatar={`https://picsum.photos/200/200/?a${item}`} />

                    }) : <h2>NO Article  :), fuck own account stupid </h2>}
                </$ViewArticle>
            </$ArticleDetail>
        }
        return <UILoading />
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

export default ViewUserDetail