import * as React from 'react'
// import { Row, Col } from 'react-bootstrap';
import './index.css'
import { Link } from "react-router-dom"
const Author = ({ }) => {
    React.useEffect(() => {
        console.log('ahihi')
        return () => { console.log('cascasn') }
    })
    const [value, setValue] = React.useState(0);
    return <div className="meta-profile item">
        <div className="left floated ui bigger avatar image">
            <Link to="/profile" ><img className="lazy" src="http://graph.facebook.com/1898075403817841/picture" /></Link>
        </div>
        <div className="right floated">
            <a className="name" href="/users/NguyenMinhDuc11111/mypage">
                <h2 className="caption">
                    Nguyễn Minh Đức
        </h2>
            </a>        <div className="extra">
                <a href="/users/NguyenMinhDuc11111/mypage">3</a>
                Article
        <br />
                <a href="/users/NguyenMinhDuc11111/mypage">16</a>
                Pepole Follow
      </div>
        </div>
    </div>
}
export default Author