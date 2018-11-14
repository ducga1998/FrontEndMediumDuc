import * as React from 'react';
interface ICommentArticleType {
    title: String,
    content: String,
    totalClap: number
}
export default class CommentArticle extends React.Component<ICommentArticleType> {

    render() {
        const { title, content, totalClap } = this.props
        return <div>
            {title} <br />s
            <hr />

            {content}
            <br />
            {totalClap}

        </div>
    }
}