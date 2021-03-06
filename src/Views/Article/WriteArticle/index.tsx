import debouce from 'lodash/debounce';
import * as React from 'react';
import styled from 'styled-components';
import articleContainer from '../../../Container/articleContainer';
import userContainer from '../../../Container/userContainer';
import Author from '../../Author';
import MediumDraft from './mediumDraft';
import {fontStack} from 'Components/styled/base';
import './medium.css'

export const updateDataArticle = debouce(async (value, content) => {
    await articleContainer.setState({[value]: content})
}, 1000);
export const updateContent = debouce(async (content ) => {
    console.log("content", content);
    await articleContainer.setState({'contentArticle': content})
}, 2000);
const WriteArticle = () => {
    const {avatarLink, name, articles, idUser} = userContainer.state.dataUser;
    React.useEffect(() => {
        // beause when user write new Article then  we reset all setting in new article, avoid case to store
        articleContainer.setState({ arrHashTag: [] })
    });
    return <$Align>
        <Wrapper  >
            <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} />
            <MediumDraft
                onChangeTitle={value => updateDataArticle('titleArticle', value)}
                onChangeContent={value => updateContent(value)}
            />
        </Wrapper>
    </$Align>
};
const Wrapper = styled.div`
    width : 70%;
    position : relative;
`;
// scalable very good
const $Align = styled.div`
    ${fontStack}; 
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
        font-size : 1.5em;
`;
export default WriteArticle
