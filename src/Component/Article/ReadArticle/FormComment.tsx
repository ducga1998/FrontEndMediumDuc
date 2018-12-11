
import UIButton from '../../../UI/UIButton';

import MediumEditer from 'medium-editor'
import * as React from 'react'
import { IMAGE_SOURCE_DEFAULT } from '../../../help/define';
import { Config } from '../../../help/config';
import styled from 'styled-components';
import { input } from '../../../UI/styled/input';
import { ArticleContext } from 'src/Component/Article/ReadArticle';
// this component view Form Comment
export const FormComment = ({ onMouseDown, getRef, avatarLink }: any) => {
    const refContent = React.useRef(null)
    React.useEffect(() => {
        getRef(refContent)
        // if (refContent.current) {
        //     const title = new MediumEditer(refContent.current, Config)

        // }
    })
    return <ArticleContext.Consumer>
        {
            articleData => {
                console.log('articleData', articleData)
                return <div>
                    <img className="smallAvatar" src={avatarLink ? avatarLink : IMAGE_SOURCE_DEFAULT} /> <b>{name}</b>
                    <$Content ref={refContent || undefined} />
                    <UIButton onMouseDown={onMouseDown} >Comment</UIButton>
                </div>
            }
        }
    </ArticleContext.Consumer>
}
const $Content = styled(input)`
`