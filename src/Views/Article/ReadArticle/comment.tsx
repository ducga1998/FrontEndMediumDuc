import * as React from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
// import { FormComment } from './writeComment';
import { Subscribe } from 'unstated-x';
import commentAllContainer from '../../../Container/commentContainer';
import UILoading from '../../../Components/UI/UILoading';
import { Config } from '../../../help/config';
import MediumEditer from 'medium-editor';
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import RelyComment from './FormRely'
import FormComment from './FormComment';
interface IViewComment {
    idArticle: string,

}
export default class ViewComment extends React.Component<IViewComment> {
    refContent = React.createRef()
    render() {

        return <Subscribe to={[commentAllContainer]}>
            {
                () => {
                    const { idArticle } = this.props
                    const data = commentAllContainer.state.registryComment.find(item => item.idArticle === idArticle)
                    if (!data) {
                        return <UILoading />
                    }
                    const { commentContainer } = data
                    return <Subscribe to={[commentContainer]}>
                        {
                            () => {
                                const { allComments } = commentContainer.state
                                return <div>
                                    {allComments.length > 0 ? allComments.map((item: any, key) => {
                                        return <Comment dataUserComment={item} />
                                    }) :
                                        <h2 style={{ textAlign: 'center', color: 'gray' }}> NO  Comment,  : ))) cmt vào cho vui đi thằng ngu</h2>
                                    }
                                </div>
                            }
                        }
                    </Subscribe>
                }
            }
        </Subscribe>

    }
}
const Comment = ({ dataUserComment }) => {
    const [open, setOpen] = React.useState(false)
    const refContent = React.useRef(null)
    React.useEffect(() => {
        console.log('refContent', refContent)
        if (refContent.current) {
            const title = new MediumEditer(refContent.current, Config)

        }
    })
    // phan biet giua form comment va render comment
    function renderComment(comment) {
        if (comment.idRely) {
            return <>
                <$Comment onMouseDown={() => { setOpen(!open) }} data-tooltip={`Created At : ${new Date(createdAt)}`}>
                    <$Img data-tooltip={name} src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} />
                    <$Content  >{renderHTML(content)}</$Content>
                </$Comment>

                {open ? <FormComment /> : null}
            </>
        }
        // id comment , idRely , content 

    }
    const { userComment: { avatarLink, name }, createdAt, content } = dataUserComment
    // userData 
    return <>

    </>
}
const $Content = styled.div`
    &:focus {
    flex : 1;
    background-color: #f3f3f3;
    transition: 0.2s;
    outline: none;
    border-radius: 10px;
    color: black;
    padding: 30px;
    font-size: 20px;
    }
    & {
        flex : 10;
        margin-left: 30px;
        margin-bottom : 10px;
        transition: 0.2s;
    }
`
const $Img = styled.img`

`
const $Comment = styled.div`
    img {
        width : 50px;
        height : 50px;
        border-radius : 50%;
    }
    border-bottom: 1px solid #e8e6e6;
    display : flex;
    /* margin : 30px 0px 0px; */
    padding: 30px;
    &:hover {
        background: #f1f3f3;
    transition: 0.3s;
    border-radius: 10px;
    }
`