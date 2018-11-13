import * as React from 'react'
import { Row, Col } from 'react-bootstrap';
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
    return <$Content>

    </$Content>
}
const $Content = styled.div`
 display : flex;
 
`
export default Profile