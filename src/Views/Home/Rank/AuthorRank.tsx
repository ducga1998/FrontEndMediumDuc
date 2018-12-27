import * as React from 'react';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated-x';
import { FlexRow, FlexCol, H2, P } from '../../../Components/styled/base';
import { AvatarImage } from '../../../Components/styled/avatar';
// import userContainer from '../../Container/userContainer';
// import { H2, FlexRow, FlexCol, P } from './Components/styled/base';
// import { AvatarImage } from '../../Components/styled/avatar';
// import './index.css';
interface IAuthor {
    author: any,
    type: string
}
const AuthorRank = ({ author, type }: IAuthor) => {
    //"count", "idUser", "name", "avatarLink", "biographical"]
    console.log('ahutorgvjksnd', author)

    return author.map(item => {
        const { count, idUser, name, avatarLink, biographical } = item
        return <FlexCol>
            <FlexRow>
                <Link to="/profile" ><AvatarImage plan radius={15} src={avatarLink} /></Link>
                <Link className="name" to={`/user/${idUser}`}>
                    <H2 className="caption">
                        {name}
                    </H2>
                </Link>
            </FlexRow>
            <FlexRow>
                <P><b> {count} {type === 'follow' ? 'People Follow' : 'Article'}</b></P>
            </FlexRow>
        </FlexCol>
    })
    // const src = avatarLink ? avatarLink : "./default.jpg"



}
export default AuthorRank