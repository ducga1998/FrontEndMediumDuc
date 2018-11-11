import * as React from 'react'
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
const Profile = () => {
    React.useEffect(() => {
        console.log('ahihi')
        return () => { console.log('cascasn') }
    })
    const [value, setValue] = React.useState(0);
    return <$Content>

    </$Content>
}
const $Content = styled.div`

`
export default Profile