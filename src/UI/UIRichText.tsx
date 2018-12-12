
import MediumEditer from 'medium-editor';
import * as React from 'react';
import styled from 'styled-components';
import { Config } from '../help/config';
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
            console.log('??????? mode', mode)
            const text = new MediumEditer(richtextRef.current, textPlaceholder)
            console.log('text', text)
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
    height : ${(props: any) => props.isTitle ? '100px' : ''};
    margin-top : 10px;
    :focus {
        outline: none;
    }
    & {
        border-top :${(props: any) => props.isTitle ? '' : '3px solid black'};
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
export default UIRichText 