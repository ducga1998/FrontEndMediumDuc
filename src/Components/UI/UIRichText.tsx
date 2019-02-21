
import MediumEditer from 'medium-editor';
import * as React from 'react';
import styled from 'styled-components';
import { Config } from '../../help/config';
import { fontStack } from '../styled/base';
interface IUIRichText {
    placeholder?: string,
    onChange?: (e: any) => any,
    isTitle?: boolean,
    mode?: 'view' | 'edit'
    children?: any,
    content?: String
}
const UIRichText = ({ placeholder, onChange, isTitle, mode, children, content }: IUIRichText) => {
    const textPlaceholder = Config(placeholder);
    const richtextRef = React.useRef(null);
    React.useEffect(() => {
        // OMG, this here handle work richtext or not work richText, it help me reuse UIRichText
        if ((!mode || mode && mode === 'edit') && richtextRef.current) {
            const text = new MediumEditer(richtextRef.current, textPlaceholder)
            text.subscribe('editableInput', async function (event) {
                //  this parameter is value rich text form  : ))). pefect 
                if (onChange && event.srcElement) {
                    await onChange(event.srcElement.innerHTML)
                }
            })
            if (content) {
                text.setContent(content, 0)
            }

        }

        return () => { console.log('cascasn') }
    })
    return <$RichText isTitle={isTitle || undefined} ref={richtextRef} >{children}</$RichText>
}
const $RichText = styled.div<any>`
    ${fontStack}
    height : ${(props: any) => props.isTitle ? '100px' : ''};
    margin-top : 10px;
    color : ${props => props.theme.text.default};
    font-size : 2em;
    :focus {
        outline: none;
    }
    & {
        border-top :${(props: any) => props.isTitle ? '' : '3px solid black'};
    }
`
export default UIRichText 