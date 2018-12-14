import * as React from 'react'
import { ArticleContext } from 'src/Views/Article/ReadArticle';
export const renderElement = (Comp) => {
    return class extends React.Component<any> {
        render() {
            return <ArticleContext.Consumer>
                {
                    context => {
                        return <Comp context={context} {...this.props} />
                    }
                }
            </ArticleContext.Consumer>
        }
    }
} 