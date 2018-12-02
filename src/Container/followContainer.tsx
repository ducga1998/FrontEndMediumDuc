import { Container } from 'unstated-x';;
import { getAllInfomationUserFollowYour, follow, unFollow } from '../API/followAPI';
import userContainer from './userContainer';
class FollowAllContainer extends Container<any>{

    constructor(data) {
        super(data)
        console.log(data)
        // this.getRoomByIdUser()
    }
    // idUserOwnAccoutCurrent = userContainer.state.dataUser.idUser
    // this function will call when me  into idUser other
    async gotoProfileOtherUser(ownProfileId) {
        const idUserFollow = userContainer.state.dataUser.idUser
        const fetchData = await getAllInfomationUserFollowYour(ownProfileId)
        const dataUserFollow = fetchData['data']['getAllInfomationUserFollowYour'] as any[]
        const followContainer = new FollowContainer({ allUserFollow: dataUserFollow })
        const itemFollow = {
            ownProfileId,
            followContainer
        }
        const { userFollow } = this.state
        if (!userFollow.includes(ownProfileId)) {
            userFollow.push(itemFollow)
        }
        if (dataUserFollow.find(user => user.idUserFollow === idUserFollow)) {
            followContainer.setState({ isFollow: true })
        }
        else {
            followContainer.setState({ isFollow: false })
        }
        this.setState({ userFollow })
    }
    async follow(ownProfileId) {
        // ownProfileId is id User will user login follow
        // yes, user press button follow is user login account
        const idUserFollow = userContainer.state.dataUser.idUser
        const { userFollow } = this.state
        // find followContainer  as ownProfileId => this is thing important
        const itemFollow = userFollow.find(item => item.ownProfileId === ownProfileId)
        if (itemFollow) {
            const { followContainer } = itemFollow
            const {
                avatarLink, name, idUser
            } = userContainer.state.dataUser
            const { allUserFollow } = followContainer.state
            const input = {
                userFollow: {
                    avatarLink, name, idUser
                },
                idUser: ownProfileId, // 
                idUserFollow
            }
            // if(allUserFollow.find(item => item.) )
            allUserFollow.push(input)
            followContainer.setState({ allUserFollow, isFollow: true })
        }

        await follow({ idUser: ownProfileId, idUserFollow })
    }
    async unfollow(ownProfileId) {
        const idUserFollow = userContainer.state.dataUser.idUser
        const { userFollow } = this.state
        const itemFollow = userFollow.find(item => item.ownProfileId === ownProfileId)
        if (itemFollow) {
            const { followContainer } = itemFollow
            const { state: { allUserFollow } } = followContainer
            // set State
            const allUserNew = allUserFollow.filter(userFollow => userFollow.idUserFollow !== idUserFollow)
            followContainer.setState({ allUserFollow: allUserNew, isFollow: false })
        }
        this.setState({ userFollow })
        // await this.setState({ isFollow: false })
        await unFollow({ idUser: ownProfileId, idUserFollow })
    }
}
class FollowContainer extends Container<any> {
    constructor(state) {
        super(state)
        state = {
            allUserFollow: [],
            isFollow: true
        }
    }

    //  we want check user following =>  
}
const followAllContainer = new FollowAllContainer({
    userFollow: []
})

window['follow'] = followAllContainer
export default followAllContainer;