import * as React from 'react';
import { Button } from 'react-bootstrap';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import { follow, getAllInfomationUserFollowYour, unFollow } from '../../API/followAPI';
import userContainer from '../../Container/userContainer';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../UI/UILoading';
import Article from '../Article';
import followAllContainer from '../../Container/followContainer';
import { Subscribe } from 'unstated-x';
interface IViewUserDetail {
    match: any
}
const { useEffect } = React
class ViewUserDetail extends React.Component<IViewUserDetail> {
    state = {
        dataUser: null,
        ownProfileId: ''
    }
    async componentDidMount() {
        const { match: { params: { id } } } = this.props
        followAllContainer.gotoProfileOtherUser(id)
        const data = await getAllInformationUser(id)
        const dataUser = data['data']['getAllInformationUser']
        await this.setState({ dataUser, ownProfileId: id })
    }

    render() {
        const { ownProfileId, dataUser } = this.state as any
        console.log('state', this.state)
        return <Subscribe to={[followAllContainer]}>
            {
                followAll => {
                    const { userFollow } = followAll.state
                    // iam filter , get followContainer have idUser Ohter
                    const item = userFollow.find(item => item.ownProfileId === ownProfileId)
                    if (!item || !dataUser) {
                        return <UILoading />
                    }
                    const { articles, avatarLink, name, idUser } = dataUser as any;
                    const { followContainer } = item
                    // console.log(followContainer)
                    return <Subscribe to={[followContainer]}>
                        {
                            container => {
                                const { allUserFollow, isFollow } = container.state


                                return <$ArticleDetail>
                                    <$Content >
                                        <Left>
                                            <$Author>
                                                <Img src={avatarLink ? avatarLink : srcImg} /> */}
                                                 <h3>{name}</h3>
                                                <h5> Article : {articles.length}</h5>
                                            </$Author>
                                            {/* <Author avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} /> */}
                                        </Left>

                                        <Right>
                                            {isFollow ? <Button bsStyle="danger" onClick={async () => { await followAllContainer.unfollow(idUser) }}>Unfollow</Button> :
                                                <Button bsStyle="info" onClick={async () => { await followAllContainer.follow(idUser) }}> Follow </Button>
                                            }


                                            {allUserFollow && allUserFollow.length > 0 ? <$ListAvatarUserFollow>
                                                {allUserFollow.map((item: any, key) => {
                                                    const { avatarLink, name } = item.userFollow
                                                    return <img key={key} data-tooltip={name} src={`${avatarLink ? avatarLink : srcImg}`} />
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
                        }
                    </Subscribe>

                }
            }
        </Subscribe>
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