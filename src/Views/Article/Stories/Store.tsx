import * as React from 'react';
import styled from 'styled-components';
import articleContainer from '../../../Container/articleContainer';
import userContainer from '../../../Container/userContainer';
import Author from '../../Author';
import { getArticleById } from '../../../API/articleAPI';
import UIRichText from '../../../Components/UI/UIRichText';
import { SubscribeOne } from 'unstated-x';
import { callWhenWrite } from '../WriteArticle';
const { useEffect } = React as any
const WriteArticle = ({ match }) => {

    const { avatarLink, name, articles, idUser } = userContainer.state.dataUser
    useEffect(async () => {
        const { params: { id } } = match
        await articleContainer.setState({ isUpdate: true, idArticleNeedUpdate: id })
        const dataArticle = await getArticleById(id) as any
        // console.log('dataArticle', dataArticle)
        if (dataArticle) {


            const { titleArticle, contentArticle, hashTag } = dataArticle
            articleContainer.setState({ titleArticle, contentArticle, arrHashTag: hashTag, isPublicArticle: true })
        }


        return () => { console.log('cascasn') }
    })
    // const [value, setValue] = React.useState(0);
    return <SubscribeOne to={articleContainer} bind={['titleArticle', 'contentArticle']}>
        {
            () => {
                const { titleArticle, contentArticle } = articleContainer.state
                if (titleArticle === '' && contentArticle === '') {
                    return null
                }
                return <$Align>
                    <div style={{
                        width: '70%'
                    }}>
                        <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={articles.length} />
                        <h1>
                            <UIRichText isTitle
                                onChange={async (titleArticle) => {
                                    await articleContainer.setState({ isPublicArticle: true, titleArticle })
                                }}
                                placeholder="Title" content={titleArticle}
                            />
                        </h1>
                        <UIRichText placeholder="Write something you want ......." content={contentArticle}
                            onChange={async (value) => { await callWhenWrite('contentArticle', value) }}
                        />


                    </div>
                </$Align>
            }
        }
    </SubscribeOne>

}

const $Align = styled.div`
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
`

export default WriteArticle 