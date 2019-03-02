import * as React from 'react';
import { Link } from "react-router-dom";

import { FlexRow, FlexCol, H2, P } from '../../../Components/styled/base';
import { AvatarImage } from '../../../Components/styled/avatar';

interface IAuthor {
    author: any,
    type: string
}
const AuthorRank = ({ author, type }: IAuthor) => {

    console.log('ahutorgvjksnd', author)

    return author.map((item , key) => {
        const { count, idUser, name, avatarLink, biographical } = item
        return <FlexCol key={key}>
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