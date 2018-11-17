import * as React from 'react';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated-x';
import userContainer from '../../Container/userContainer';
// import { Row, Col } from 'react-bootstrap';
import './index.css';
interface IAuthor {
    name: string,
    totalFollow: number,
    totalArticle: number,
    avatarLink?: string
}
const Author = ({ name, totalFollow, totalArticle, avatarLink }: IAuthor) => {
    const src = avatarLink ? avatarLink : "http://graph.facebook.com/1898075403817841/picture"
    return <Subscribe to={[userContainer]}>
        {
            container => {

                return <div className="meta-profile item">
                    <div className="left floated ui bigger avatar image">
                        <Link to="/profile" ><img className="lazy" src={src} /></Link>
                    </div>
                    <div className="right floated">
                        <a className="name" href="/users/NguyenMinhDuc11111/mypage">
                            <h2 className="caption">
                                {name}
                            </h2>
                        </a>        <div className="extra">
                            <a href="/users/NguyenMinhDuc11111/mypage">{totalArticle}</a>
                            Article
                         <br />
                            <a href="/users/NguyenMinhDuc11111/mypage">{totalFollow}</a>
                            Pepole Follow
                      </div>
                    </div>
                </div>
            }
        }
    </Subscribe>
}
export default Author