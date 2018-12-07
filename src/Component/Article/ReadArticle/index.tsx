
import * as React from 'react';
import { Label } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { getArticleById } from '../../../API/articleAPI';
import { getAllCommentinArtcileCurrent } from '../../../API/commentAPI';
import UILoading from '../../../UI/UILoading';
import Author from '../../Author';
import CommentArticle from './comment';
import WriteComment from './writeComment';
import commentContainer from '../../../Container/commentContainer';
import { Prompt } from 'react-router'
import { withRouter } from 'react-router'
import UIReaction from '../../../UI/UIReaction';

interface IReadArticleType {
    title: String,
    content: String,
    totalClap: number,
    match: any,
    router?: any,
    route?: any
}
class ReadArticle extends React.Component<any> {
    state = {
        article: null,
        allCommentInArticle: []
    }
    async componentDidMount() {
        const { match: { params: { id } }, router } = this.props
        commentContainer.getAllCommentByIdArticle(id)
        console.log('didmout article')
        // before refactor articleContainer
        const article = await getArticleById(id) as any
        if (article) {
            // const {user: { idUser, avatarLink, name, articles }} = article
            // allBookMarkContainer.isBookMark({ idArticle: id })

            await this.setState({ article })
        }
    }


    render() {
        // console.log(allBookMarkContainer)
        const { article, allCommentInArticle }: any = this.state

        if (article) {
            console.log('update update', article, allCommentInArticle)
            const { user: { idUser, avatarLink, name, articles }, idArticle, contentArticle, titleArticle, hashTag, createTime } = article
            return <$Align>
                {/* UIReraction need idArticle and idUser own this article */}
                <UIReaction idArticle={idArticle} idUseOwnArticler={idUser} />
                <div style={{
                    width: '70%'
                }}>

                    <Author idUser={idUser} avatarLink={avatarLink} totalFollow={10} name={name} totalArticle={213} />
                    <$HashTag>
                        HashTag :  {hashTag.map((item, key) => {
                            return <Label key={key} style={{ fontSize: '15px', margin: ' 0px' }}>{item}</Label>
                        })}
                    </$HashTag>


                    <p>{createTime}</p>
                    <$Title>
                        <h1> {renderHTML(titleArticle)}</h1>
                    </$Title>
                    <$ContentArticle >
                        {renderHTML(contentArticle)}
                    </$ContentArticle>
                    <$WriteComment>
                        {/* component assign  add new Comment */}
                        <WriteComment
                            titleArticle={titleArticle}
                            onChange={async (comment) => {
                                allCommentInArticle.push(comment);
                                await this.setState({ allCommentInArticle })
                            }}
                            idUser={idUser}
                            idArticle={article.idArticle}
                            imgSrc={avatarLink} name={name} />
                    </$WriteComment>
                    <h2>All Comment Article</h2>
                    <$ViewComment>
                        {/* view comment component */}
                        <CommentArticle

                            comments={allCommentInArticle} idArticle={article.idArticle} />
                    </$ViewComment>

                </div>
            </$Align>
        }
        return <UILoading />

    }
}
export default ReadArticle
const $ViewComment = styled.div`

`
const $WriteComment = styled.div`
border-bottom : 1px solid gray;
padding-bottom : 10px;
`
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

const $ContentArticle = styled.div`
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
const $Title = styled.div`
    height : 100px;
    &:focus {
        outline : none;
    }
    
`