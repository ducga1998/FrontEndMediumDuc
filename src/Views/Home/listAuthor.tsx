import * as React from 'react';
import userContainer from '../../Container/userContainer';
import Author from '../Author';
const ListAuthor = ({ }) => {
    React.useEffect(() => {
        return () => { console.log('cascasn') }
    })
    const [value, setValue] = React.useState(0);
    const { avatarLink, name, articles, idUser } = userContainer.state.dataUser
    // const link = avatarLink ? avatarLink : "http://graph.facebook.com/1898075403817841/picture"
    return <>{
        [1, 2, 24, 5].map((item, key) => {
            return <Author idUser={idUser} key={key} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} />
        })
    }</>
}
export default ListAuthor