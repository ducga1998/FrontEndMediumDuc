import * as React from 'react';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated-x';
import userContainer from '../../Container/userContainer';
import { FlexRow, FlexCol, P, H4 } from 'Components/styled/base';
import { AvatarImage } from 'Components/styled/avatar';
import styled from 'styled-components';
// import './index.css';
interface IAuthor {
    name: string,
    totalFollow: number,
    totalArticle: number,
    avatarLink?: string,
    idUser: string
}
const Author = ({ name, totalFollow, avatarLink, idUser }: IAuthor) => {
    const src = avatarLink ? avatarLink : "./default.jpg"
    return <Subscribe to={[userContainer]}>
        {
            () => {
                return  <WrapperAuthor>
                        <Link to="/profile"><AvatarImage src={src} /></Link>
                        <FlexCol>
                            <Link className="name" to={`/user/${idUser}`}>
                                <H4 className="caption">
                                    {name}
                                </H4>
                            </Link>
                            <P><b> {totalFollow} Follow</b></P>
                        </FlexCol>
                    </WrapperAuthor>
            }
        }
    </Subscribe>
}
const WrapperAuthor = styled(FlexRow)`
    align-items : center;
`
export default Author