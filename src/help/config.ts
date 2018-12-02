export function Config(title) {
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