import * as React from 'react';
import styled from 'styled-components';
interface IProfile {
    avatarLink: string,
    name: string,
    totalFollow: number,
    dataArticle: any[],
    listPeopleFollow: any[]
}
const { useEffect } = React as any
const Profile = ({ avatarLink, name, totalFollow, dataArticle, listPeopleFollow }) => {
    useEffect(() => {
        console.log('ahihi')
        return () => { console.log('cascasn') }

    })
    // const { avatarLink, name, articles } = userContainer.state.dataUser 
    return <$Content >
        <Left>

        </Left>
        dataArticle
            <Right>
            {listPeopleFollow.map(item => {
                return <div>
                    akakka|
                    </div>
            })}
            People Follow
            This here will all anthor pepople follow me
        </Right>
    </$Content >
}
const $Content = styled.div`
 display : flex;
`
const Left = styled.div`
flex : 5
`
const Right = styled.div`
flex : 6
`
export default Profile