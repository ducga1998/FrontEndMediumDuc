import * as React from 'react';
import { Link } from "react-router-dom";
import { Subscribe } from 'unstated-x';
import userContainer from '../../Container/userContainer';
import { H2, FlexRow, FlexCol, P } from '../../Components/styled/base';
import { AvatarImage } from '../../Components/styled/avatar';
// import './index.css';
interface IAuthor {
    name: string,
    totalFollow: number,
    totalArticle: number,
    avatarLink?: string,
    idUser: string
}
const Author = ({ name, totalFollow, totalArticle, avatarLink, idUser }: IAuthor) => {
    const src = avatarLink ? avatarLink : "./default.jpg"
    return <Subscribe to={[userContainer]}>
        {
            () => {
                return <FlexCol>
                    <FlexRow>
                        <Link to="/profile" ><AvatarImage  src={src} /></Link>
                            
                  
                        <Link className="name" to={`/user/${idUser}`}>
                            <H2 className="caption">
                                {name}
                            </H2>
                        </Link>     
                        </FlexRow>
                        <FlexRow>
                          <P> <b>{totalArticle} </b>
                            Article</P> 
                         <br />

                            <P><b> {totalFollow} Pepole Follow</b></P>
                            </FlexRow>
                            </FlexCol>
                         
        
            }
        }
    </Subscribe>
}
export default Author