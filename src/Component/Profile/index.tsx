import * as React from 'react';
import styled from 'styled-components';
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
const Profile = ({ name, avatarLink, totalFollow, followOtherPeople, bookMark }) => {
    React.useEffect(() => {
        console.log('ahihi')
        return () => { console.log('cascasn') }
    })
    const [value, setValue] = React.useState(0);
    // const { avatarLink, name, articles } = userContainer.state.dataUser as any
    return < $Content >
        {/* <Author avatarLink={avatarLink} totalFollow={totalFollow} name={name} totalArticle={articles.length} /> */}


    </$Content >
}
const $Content = styled.div`
 display : flex;
`
export default Profile