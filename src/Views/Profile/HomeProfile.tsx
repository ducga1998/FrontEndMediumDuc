import * as React from 'react';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../Components/UI/UILoading';
import Article from '../Article';
import followAllContainer from '../../Container/followContainer';
import { Subscribe } from 'unstated-x';
import { H3, H1, FlexRow } from '../../Components/styled/base';
import { StyledSolidButton } from '../../Components/styled/button';
import { socketNotication } from '../../socketClient/socket';
interface IViewUserDetail {
    match: any
}
class ViewUserDetail extends React.Component<IViewUserDetail> {
    state = {
        dataUser: null,
        ownProfileId: ''
    }
    async componentDidMount() {
        const { match: { params: { id } } } = this.props
        followAllContainer.gotoProfileOtherUser(id)
        const dataUser = await getAllInformationUser(id)
        await this.setState({ dataUser, ownProfileId: id })
    }
    async follow(idUser) {
        socketNotication({ idUser }, 'Follow')
        await followAllContainer.follow(idUser)
    }
    render() {
        const { ownProfileId, dataUser } = this.state as any
        return <Subscribe to={[followAllContainer]}>
            {
                followAll => {
                    const { userFollow } = followAll.state
                    // iam filter , get followContainer have idUser Ohter
                    const item = userFollow.find(item => item.ownProfileId === ownProfileId)
                    if (!item || !dataUser) {
                        return <UILoading />
                    }
                    const { articles, avatarLink, name, idUser, location, biographical, birthday } = dataUser as any;
                    const { followContainer } = item
                    console.log('aritcle', articles)
                    return <Subscribe to={[followContainer]}>
                        {
                            container => {
                                const { allUserFollow, isFollow } = container.state
                                return <$ArticleDetail>
                                    <$Content >
                                        <Left>
                                            <$Author>
                                                <Img src={avatarLink ? avatarLink : srcImg} />
                                                <H3>Name : {name}</H3>
                                                <H3> Location : {location} </H3>
                                                <H3> Article : {articles.length}</H3>
                                                <H3>Birthday : {birthday}</H3>
                                            </$Author>
                                            {/* <Author avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} /> */}
                                        </Left>

                                        <Right>
                                            {isFollow ? <StyledSolidButton
                                                hoverColor="text.placeholder"
                                                color="text.alt"
                                                onClick={async () => { await followAllContainer.unfollow(idUser) }}>
                                                Unfollow
                                                </StyledSolidButton>
                                                :
                                                <StyledSolidButton
                                                    hoverColor="space.default"
                                                    color="space.alt"
                                                    onClick={() => { this.follow(ownProfileId) }}>
                                                    Follow
                                                  </StyledSolidButton>
                                            }
                                            {allUserFollow && allUserFollow.length > 0 ?
                                                <$ListAvatarUserFollow>
                                                    {
                                                        allUserFollow.map((item: any, key) => {
                                                            const { name } = item.userFollow
                                                            return <img key={key} data-tooltip={name} src={`${item.userFollow.avatarLink ? item.userFollow.avatarLink : srcImg}`} />
                                                        })}

                                                </$ListAvatarUserFollow> : <p><b>No user Follow :((</b></p>}
                                            <div>
                                                Bio : <div ><H1>{biographical}</H1></div>
                                            </div>
                                        </Right>
                                    </$Content >
                                    <hr />
                                    <H3> All Article <b style={{ color: "#4797db" }} >{name} </b> has write</H3>
                                    <$ListArticle>
                                        {
                                            articles && articles.length > 0 ? articles.map((item, key) => {
                                                return <Article article={item} />

                                            }) :
                                                <h2>NO Article  :), fuck own account stupid </h2>
                                        }
                                    </$ListArticle>
                                </$ArticleDetail>
                            }
                        }
                    </Subscribe>

                }
            }
        </Subscribe>
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
const $Author = styled.div``
const $ArticleDetail = styled.div``
const $ListArticle = styled(FlexRow)`
    flex-wrap : wrap;
    align-items: initial;
`
const $Content = styled.div`
    display : flex;
`
const Left = styled.div`
    flex : 5;
`
const Right = styled.div`
    flex : 6;
`
export default ViewUserDetail