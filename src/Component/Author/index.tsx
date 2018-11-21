import * as React from 'react';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated-x';
import userContainer from '../../Container/userContainer';
import './index.css';
interface IAuthor {
    name: string,
    totalFollow: number,
    totalArticle: number,
    avatarLink?: string,
    idUser: string
}
const Author = ({ name, totalFollow, totalArticle, avatarLink, idUser }: IAuthor) => {
    const src = avatarLink ? avatarLink : "http://graph.facebook.com/1898075403817841/picture"
    return <Subscribe to={[userContainer]}>
        {
            container => {

                return <div className="meta-profile item">
                    <div className="left floated ui bigger avatar image">
                        <Link to="/profile" ><img className="lazy" src={src} /></Link>
                    </div>
                    <div className="right floated">
                        <Link className="name" to={`/user/${idUser}`}>
                            <h2 className="caption">
                                {name}
                            </h2>
                        </Link>        <div className="extra">
                            <b>{totalArticle} </b>
                            Article
                         <br />

                            <b> {totalFollow} Pepole Follow</b>
                        </div>
                    </div>
                </div>
            }
        }
    </Subscribe>
}
export default Author