import * as React from 'react';
interface IReadArticleType {
    title: String,
    content: String,
    totalClap: number
}
export default class ReadArticle extends React.Component<IReadArticleType> {

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
