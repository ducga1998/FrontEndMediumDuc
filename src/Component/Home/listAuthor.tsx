import * as React from 'react';
// import { Row, Col } from 'react-bootstrap';
// import './index.css'
import Author from '../Author';
const ListAuthor = ({ }) => {
    React.useEffect(() => {
        // console.log('ahihi')
        return () => { console.log('cascasn') }
    })
    const [value, setValue] = React.useState(0);
    return <>{
        [1, 2, 24, 5,].map(item => {
            return <Author />
        })
    }</>
}
export default ListAuthor