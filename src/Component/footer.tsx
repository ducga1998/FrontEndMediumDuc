import * as React from 'react'
import { Row, Col } from 'react-bootstrap';
const Footer = () => {
    React.useEffect(() => {
        console.log('ahihi')
        return () => { console.log('cascasn') }
    })
    const [value, setValue] = React.useState(0);
    return <div></div>
}
export default Footer