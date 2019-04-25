import * as React from 'react';
import styled from 'styled-components';
import articleContainer from '../../../Container/articleContainer';
import userContainer from '../../../Container/userContainer';
import Author from '../../Author';
import { getArticleById } from '../../../API/articleAPI';
import { updateDataArticle, updateContent } from '../WriteArticle';
import MediumDraft from '../WriteArticle/mediumDraft';
import { fontStack } from '../../../Components/styled/base';
import UILoading from '../../../Components/UI/UILoading';

class WriteArticle extends React.Component<any> {
    state = {
        dataArticle: null
    }
    async componentDidMount() {
        const { params: { id } } = this.props.match
        await articleContainer.setState({ isUpdate: true, idArticleNeedUpdate: id })
        const dataArticle = await getArticleById(id) as any
        // console.log('dataArticle', dataArticle)
        if (dataArticle) {
            console.log('data article to store ', dataArticle)

            const { titleArticle, contentArticle, hashTag } = dataArticle
            this.setState({ dataArticle })
            articleContainer.setState({ titleArticle, contentArticle, arrHashTag: hashTag, isPublicArticle: true })
        }
    }
    render() {
        const { dataArticle } = this.state
        const { avatarLink, name, articles, idUser } = userContainer.state.dataUser
        if (!dataArticle) {
            return <UILoading />
        }
        const { titleArticle, contentArticle } = dataArticle as any
        if (titleArticle === '' && contentArticle === '') {
            return null
        }
        return <$Align>
            <div className= "width70">
                <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} />
                <MediumDraft
                    onChangeTitle={value => updateDataArticle('titleArticle', value)}
                    onChangeContent={value => updateContent(value)}
                    initArticle={contentArticle} />
            </div>
        </$Align>
    }
}
const $Align = styled.div`
        ${fontStack}  
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
        font-size : 1.5em;
        .width70{
            width : 70%;
        }
`

export default WriteArticle 