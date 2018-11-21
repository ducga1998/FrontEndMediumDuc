import * as React from 'react';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import { IMAGE_SOURCE_DEFAULT } from './writeComment';
interface IViewComment {
    idArticle: string,
    comments: any[],

}
export default class ViewComment extends React.Component<IViewComment> {
    state = {
        comments: []
    }
    async componentDidMount() {
        const { comments, idArticle } = this.props
        await this.setState({ comments })
    }
    async componentDidUpdate(preState, preProps) {
        if (preProps.comments !== this.props.comments) {
            const { comments } = this.props
            this.setState({ comments })
        }
    }
    render() {
        const { comments } = this.state

        console.log(comments)
        return <div>
            {comments.map((item: any, key) => {
                const { userComment: { avatarLink, name } } = item
                return <$Comment key={key} >

                    <$Img data-tooltip={name} src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} />
                    <$Content >{renderHTML(item.content)}</$Content>
                </$Comment>
            })}
        </div>
    }
}
const $Content = styled.div`
    &:focus {
    background-color: #c3c0c0;
    transition: 0.5s;
    outline: none;
    border-radius: 10px;
    color: black;
    padding: 30px;
    font-size: 20px;
    }
    & {
        margin-left: 30px;
        margin-bottom : 10px;
        transition: 0.5s;
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
    margin : 30px 0px;
    padding: 30px;
    &:hover {
        background: #f1f3f3;
    transition: 0.3s;
    border-radius: 10px;
    }
   
`