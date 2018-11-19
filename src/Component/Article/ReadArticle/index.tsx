import * as React from 'react';
import { Label } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { getArticleById } from '../../../API/articleAPI';
import UILoading from '../../../UI/UILoading';
import Author from '../../Author';
interface IReadArticleType {
    title: String,
    content: String,
    totalClap: number,
    match: any
}
export default class ReadArticle extends React.Component<IReadArticleType> {
    state = {
        article: null
    }
    async componentDidMount() {
        const { match: { params: { id } } } = this.props
        const dataArticle = await getArticleById(id) as any
        // console.log('dataArticle', dataArticle)
        if (dataArticle) {
            const { data: { getArticleById } } = dataArticle
            console.log('dataArticle', getArticleById)
            await this.setState({ article: getArticleById })
        }
    }
    //idUser", "login", "password", "decentraliz", "name", "avatarLink", "__typename"]
    //idArticle", "idUser", "hashTag", "category", "comment", "totalClap", "notification", "contentArticle", "imageArticle", "titleArticle", "createTime", "user", "__typename"
    render() {
        const { article }: any = this.state
        if (article) {
            const { user: { avatarLink, name, articles, }, contentArticle, titleArticle, hashTag, createTime } = article
            return <$Align>
                <div style={{
                    width: '70%'
                }}>

                    <Author avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={213} />
                    <$HashTag>
                        HashTag :  {hashTag.map(item => {
                            return <Label style={{ fontSize: '15px', margin: ' 0px' }}>{item}</Label>
                        })}
                    </$HashTag>


                    <p>{createTime}</p>
                    <$Title>
                        {renderHTML(titleArticle.trim().replace(' ', ''))}
                    </$Title>
                    <$WriteContent >
                        {renderHTML(contentArticle.trim().replace(' ', ''))}
                    </$WriteContent>

                </div>
            </$Align>
        }
        return <UILoading />

    }
}
const $HashTag = styled.div`
    font-family : 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-stretch : 700;
    margin : 20px 0px;
    >span {
        margin-left : 5px;
    }
`
const $Align = styled.div`
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
`

const $WriteContent = styled.div`
    margin-top : 10px;
    :focus {
        outline: none;
    }
    & {
        border-top : 3px solid black;
    }
    p {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 22px;
        line-height: 30px;
        margin-bottom : 40px;
    }

    .top-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: auto;
        z-index: 10;
        padding: 10px;
        background-color: #000;
        background-color: rgba(0, 0, 0, .8);
        box-shadow: 0 0 4px #000;
        box-sizing: border-box;
        color: #ccc;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
    }



    h1 {
        font-size: 60px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 40px;
        letter-spacing: -2px;
        border-bottom: 1px solid #dbdbdb;
    }

    h3 {
        font-size: 32px;
        line-height: 42px;
    }

    h4 {
        font-size: 26px;
        line-height: 32px;
    }


    a {
        color:black;
    }

    a:hover {
        color:green;
    }

    pre {
        font-family: medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif;
        font-size: 15px;
        background-color: #f0f0f0;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        color: #666;
    }

    blockquote {
        display: block;
        padding-left: 20px;
        border-left: 6px solid #df0d32;
        margin-left: -15px;
        padding-left: 15px;
        font-style: italic;
        color: #555;
    }


    .editable,
    .secondEditable
    {
        outline: none;
        margin: 0 0 20px 0;
        padding: 0 0 20px 0;
        border-bottom: 1px solid #dbdbdb;
    }



    .column-container {

    }

    .column {
        vertical-align: top;
        display: inline-block;
        width: 30%;
        margin: 10px 1%;
    }

    .github-link {
        z-index: 100;
        position: absolute;
        top: 0;
        right: 0;
        border: 0;
    }
`
const $Title = styled($WriteContent)`
    height : 100px;
    font-size : 2em;
`