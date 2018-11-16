import debouce from 'lodash/debounce';
import MediumEditer from 'medium-editor';
import * as React from 'react';
import styled from 'styled-components';
import articleContainer from '../../../Container/articleContainer';
import Author from '../../Author';
function Config(title) {
    return {
        toolbar: {
            allowMultiParagraphSelection: true,
            diffLeft: 0,
            diffTop: -10,
            firstButtonClass: 'medium-editor-button-first',
            lastButtonClass: 'medium-editor-button-last',
            relativeContainer: null,
            standardizeSelectionStart: false,
            static: false,
            /* options which only apply when static is true */
            align: 'center',
            sticky: false,
            updateOnEmptySelection: false,
            imageDragging: true,
            buttons: [
                'bold',
                'italic',
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                {
                    name: 'h1',
                    action: 'append-h2',
                    aria: 'header type 1',
                    tagNames: ['h2'],
                    contentDefault: '<b>H1</b>',
                    classList: ['custom-class-h1'],
                    attrs: {
                        'data-custom-attr': 'attr-value-h1'
                    }
                },
                {
                    name: 'h2',
                    action: 'append-h3',
                    aria: 'header type 2',
                    tagNames: ['h3'],
                    contentDefault: '<b>H2</b>',
                    classList: ['custom-class-h2'],
                    attrs: {
                        'data-custom-attr': 'attr-value-h2'
                    }
                },
                "image",
                'quote',
                'anchor',
                "removeFormat"
            ]
        },
        anchor: {
            placeholderText: 'Title',
            customClassOption: 'btn',
            customClassOptionText: 'Create Button'
        },
        paste: {
            cleanPastedHTML: true,
            cleanAttrs: ['style', 'dir'],
            cleanTags: ['label', 'meta'],
            unwrapTags: ['sub', 'sup']
        },
        anchorPreview: {
            hideDelay: 300
        },
        placeholder: {
            text: title
        },
        keyboardCommands: {
            /* This example includes the default options for keyboardCommands,
               if nothing is passed this is what it used */
            commands: [
                {
                    command: 'bold',
                    key: 'B',
                    meta: true,
                    shift: false,
                    alt: false
                },
                {
                    command: 'italic',
                    key: 'I',
                    meta: true,
                    shift: false,
                    alt: false
                },
                {
                    command: 'underline',
                    key: 'U',
                    meta: true,
                    shift: false,
                    alt: false
                }
            ],
        }
    }
}

const CallWhenWrite = debouce(async (value, content) => {
    console.log('asc')

    console.log(content)
    if (content === '<p><br></p>') {
        await articleContainer.setState({ isPublicArticle: false })
    }
    else {
        await articleContainer.setState({ isPublicArticle: true, [value]: content })
    }
}, 3000)

const WriteArticle = () => {
    const textPlaceholder = Config('Write something you want .......');
    const titlePlaceholder = Config('Title');
    const inputEl = React.useRef(null);
    const refTitle = React.useRef(null)
    React.useEffect(() => {
        const text = new MediumEditer(inputEl.current, textPlaceholder)
        const title = new MediumEditer(refTitle.current, titlePlaceholder)
        text.subscribe('editableInput', function (event, editable) {
            CallWhenWrite('contentArticle', event.srcElement.innerHTML)
        });
        title.subscribe('editableInput', async function (event, editable) {
            await articleContainer.setState({ isPublicArticle: true, titleArticle: event.srcElement.innerHTML })
        })
        return () => { console.log('cascasn') }
    })
    // const [value, setValue] = React.useState(0);
    return <$Align>
        <div style={{
            width: '70%'
        }}>
            <Author />
            <$Title ref={refTitle} />
            <$WriteContent ref={inputEl} />

        </div>
    </$Align>

}

const $Align = styled.div`
        display : flex;
        width : 100%;
        margin-bottom : 10px;
        /* flex-direction : column; */
        justify-content : center;
`

const $WriteContent = styled.div`
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
const $Title = styled($WriteContent)`
    height : 100px;
    font-size : 2em;
`
export default WriteArticle 