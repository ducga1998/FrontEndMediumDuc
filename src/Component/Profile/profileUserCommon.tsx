import * as React from 'react';
import styled from 'styled-components';
import userContainer from '../../Container/userContainer';
import Author from '../Author';
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
interface IProfile {
    avatarLink: string,
    name: string,
    totalFollow: number,
    dataArticle: any[],
    listPeopleFollow: any[]
}
const { useEffect } = React
const Profile = () => {
    useEffect(() => {
        console.log('ahihi')
        return () => { console.log('cascasn') }

    })
    const { avatarLink, name, articles } = userContainer.state.dataUser as any
    return <$Content >
        <Left>
            <Author avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} />
        </Left>
        dataArticle
            <Right>
            {articles.map(item => {
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