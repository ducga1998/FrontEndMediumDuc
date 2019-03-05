import * as React from 'react';
import { getAllInformationUser } from 'src/API/client';
import styled from 'styled-components';
import srcImg from '../../image/9284571_300x300.jpeg';
import UILoading from '../../Components/UI/UILoading';
import Article from '../Article';
import followAllContainer from '../../Container/followContainer';
import { Subscribe } from 'unstated-x';
import { H3, H1, FlexRow, FlexCol, H2 } from '../../Components/styled/base';
import { StyledSolidButton } from '../../Components/styled/button';
import { socketNotication } from '../../socketClient/socket';
import UIFieldAlgin from '../../Components/UI/UIFieldAlgin';
import UIEditer from 'src/Components/UI/UIEditer';
import UIButton from 'src/Components/UI/UIButton';
import UIModal from 'src/Components/UI/UIModal';
import { AvatarImage } from 'src/Components/styled/avatar';
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
                    console.log('articlesarticlesarticles ', articles)
                    return <Subscribe to={[followContainer]}>
                        {
                            container => {
                                const { allUserFollow, isFollow } = container.state
                                console.log('allUserFollow',allUserFollow)
                                return <$WrapperProfile>
                                    <Backgroud src="https://i.ytimg.com/vi/X42N5384rLk/maxresdefault.jpg" >
                                        <WrapperAvatar>
                                            <AvatarImage size={200}
                                                src={avatarLink ? avatarLink : srcImg} />
                                            <H2 style={{ textAlign: 'center' }}>{name}</H2>
                                        </WrapperAvatar>
                                    </Backgroud>

                                    <UIFieldAlgin vectical  >
                                        <$Author>
                                            <H3> B: {birthday}</H3>
                                            <H3> Article : {location}</H3>
                                            <H3> Article : {biographical}</H3>
                                            <H3> Article : {articles.length}</H3>
                                        </$Author>
                                        <div className="md-listarticle">
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
                                            <div className="md-listFollow">
                                                {allUserFollow && allUserFollow.length > 0 ?
                                                    <>
                                                        {
                                                            allUserFollow.map((item: any, key) => {
                                                                const { name } = item.userFollow
                                                                return <AvatarImage key={key} data-tooltip={name} src={`${item.userFollow.avatarLink ? item.userFollow.avatarLink : srcImg}`} />
                                                            })}

                                                    </> : <p><b>No user Follow :((</b></p>}
                                                <UIButton to={`/chatMessage/${ownProfileId}`} />
                                            </div>
                                        </div>
                                    </UIFieldAlgin>

                                </$WrapperProfile>
                            }
                        }
                    </Subscribe>

                }
            }
        </Subscribe>
    }
}
//"idArticle", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "titleArticle", "imageArticle", "createTime", "__typename"
const WrapperAvatar = styled(FlexCol)`
    background-color: #ffffff;
    padding: 20px;
    align-items : center;
    border-radius: 10px;
    box-shadow: 1px 1px 14px 0px black;
    transform: translateY(50%);

`
const Backgroud = styled(FlexRow) <any>`
    background-size: cover;
    width : 100%;
    height : 500px;
    background-color : blue;
    align-items : flex-end;
    justify-content : center;
    background-image : url(${(props: any) => props.src ? props.src : './default.jpg'});
`
//"idArticle", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "titleArticle", "imageArticle", "createTime", "__typename"
const $Author = styled.div`
    flex : 4;
    background : red;
    h3 {
        margin : 0px;
        padding : 10px;
    }
    h3 .glyphicon {
        opacity : 0;
        transition : .3s;
        cursor : pointer;
    }
    h3:hover {
        background-color: #f8f8f8;
    }
    h3:hover .glyphicon{
        opacity : 1;
        transition : .3s;
    }
    h3 span {
    float : right;
    }
`
const $WrapperProfile = styled(FlexCol)`
    .md-listarticle {
        flex : 8;
        .md-listFollow {
        }
    }
`

export default ViewUserDetail