import * as React from 'react'
import { Row, Col } from 'react-bootstrap';
const Footer = () => {
    React.useEffect(() => {
        console.log('ahihi')
        return () => { console.log('cascasn') }
    })
    const [value, setValue] = React.useState(0);
    return <Row style={
        {
            backgroundColor: 'yellow'
        }
    }>
        <Col xs={12}>
            <button onClick={e => {
                setValue(value + 1)
            }}> {value}</button>
        </Col>
    </Row>
}
export default Footer