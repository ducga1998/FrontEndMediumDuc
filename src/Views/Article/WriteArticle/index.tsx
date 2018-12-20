import debouce from 'lodash/debounce';
import * as React from 'react';
import styled from 'styled-components';
import articleContainer from '../../../Container/articleContainer';
import userContainer from '../../../Container/userContainer';
import Author from '../../Author';
import UIRichText from '../../../Components/UI/UIRichText';
import MediumDraft from './mediumDraft';
import { fontStack } from '../../../Components/styled/base';


export const callWhenWrite = debouce(async (value, content) => {
    if (content === '<p><br></p>') {
        await articleContainer.setState({ isPublicArticle: false })
    }
    else {
        await articleContainer.setState({ isPublicArticle: true, [value]: content })
    }
}, 3000)
const WriteArticle = () => {
    const { avatarLink, name, articles, idUser } = userContainer.state.dataUser
    React.useEffect(() => {
        // beause when user write new Article then  we reset all setting in new article, avoid case to store
        articleContainer.setState({ arrHashTag: [] })

        return () => { console.log('cascasn') }
    })
    return <$Align>
        <div style={{
            width: '70%'
        }}>
            <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} />
            <MediumDraft />

        </div>
    </$Align>

}

const $Align = styled.div`
${fontStack}
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
        font-size : 1.5em;
`
export default WriteArticle 