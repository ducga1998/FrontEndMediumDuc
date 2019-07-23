import * as React from 'react'
import { ArticleContext } from 'Views/Article/ReadArticle';
export const HistoryContext = React.createContext(null)
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