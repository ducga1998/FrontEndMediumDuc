// this is file convert data drajs to string html

import {styleToCSS} from 'draft-js-export-html/lib/helpers/combineOrderedStyles'
import {combineOrderedStyles, normalizeAttributes} from './helps'
import {BLOCK_TYPE, CharacterMetaList, ENTITY_TYPE, getEntityRanges, INLINE_STYLE,} from 'draft-js-utils';
import {ContentBlock, ContentState, EntityInstance,} from 'draft-js';
import {Attributes, AttrMap, Options, StyleMap} from './helps/type';

const {BOLD, CODE, ITALIC, STRIKETHROUGH, UNDERLINE} = INLINE_STYLE;
const INDENT = '  ';
const BREAK = '<br>';
const DATA_ATTRIBUTE = /^data-([a-z0-9-]+)$/;

const DEFAULT_STYLE_MAP = {
    [BOLD]: {element: 'strong'},
    [CODE]: {element: 'code'},
    [ITALIC]: {element: 'em'},
    [STRIKETHROUGH]: {element: 'del'},
    [UNDERLINE]: {element: 'u'},
};

// Order: inner-most style to outer-most.
// Examle: <em><strong>foo</strong></em>
const DEFAULT_STYLE_ORDER = [BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE];

// Map entity data to element attributes.
const ENTITY_ATTR_MAP: { [entityType: string]: AttrMap } = {
    [ENTITY_TYPE.LINK]: {
        url: 'href',
        href: 'href',
        rel: 'rel',
        target: 'target',
        title: 'title',
        className: 'class',
    },
    [ENTITY_TYPE.IMAGE]: {
        src: 'src',
        height: 'height',
        width: 'width',
        alt: 'alt',
        className: 'class',
    },
};

// Map entity data to element attributes.
const DATA_TO_ATTR = {
    [ENTITY_TYPE.LINK](entityType: string, entity: EntityInstance): Attributes {
        let attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType)
            ? ENTITY_ATTR_MAP[entityType]
            : {};
        let data = entity.getData();
        let attrs = {};
        for (let dataKey of Object.keys(data)) {
            let dataValue = data[dataKey];
            if (attrMap.hasOwnProperty(dataKey)) {
                let attrKey = attrMap[dataKey];
                attrs[attrKey] = dataValue;
            } else if (DATA_ATTRIBUTE.test(dataKey)) {
                attrs[dataKey] = dataValue;
            }
        }
        return attrs;
    },
    [ENTITY_TYPE.IMAGE](entityType: string, entity: EntityInstance): Attributes {
        let attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType)
            ? ENTITY_ATTR_MAP[entityType]
            : {};
        let data = entity.getData();
        let attrs = {};
        for (let dataKey of Object.keys(data)) {
            let dataValue = data[dataKey];
            if (attrMap.hasOwnProperty(dataKey)) {
                let attrKey = attrMap[dataKey];
                attrs[attrKey] = dataValue;
            } else if (DATA_ATTRIBUTE.test(dataKey)) {
                attrs[dataKey] = dataValue;
            }
        }
        return attrs;
    },
};

// The reason this returns an array is because a single block might get wrapped
// in two tags.
function getTags(blockType: string, defaultBlockTag): Array<string> {
    switch (blockType) {
        case BLOCK_TYPE.HEADER_ONE:
            return ['h1'];
        case BLOCK_TYPE.HEADER_TWO:
            return ['h2'];
        case BLOCK_TYPE.HEADER_THREE:
            return ['h3'];
        case BLOCK_TYPE.HEADER_FOUR:
            return ['h4'];
        case BLOCK_TYPE.HEADER_FIVE:
            return ['h5'];
        case BLOCK_TYPE.HEADER_SIX:
            return ['h6'];
        case BLOCK_TYPE.UNORDERED_LIST_ITEM:
        case BLOCK_TYPE.ORDERED_LIST_ITEM:
            return ['li'];
        case BLOCK_TYPE.BLOCKQUOTE:
            return ['blockquote'];
        case BLOCK_TYPE.CODE:
            return ['pre', 'code'];
        case BLOCK_TYPE.ATOMIC:
            return ['figure'];
        default:
            if (defaultBlockTag === null) {
                return [];
            }
            return [defaultBlockTag || 'p'];
    }
}

function getWrapperTag(blockType: string): string {
    switch (blockType) {
        case BLOCK_TYPE.UNORDERED_LIST_ITEM:
            return 'ul';
        case BLOCK_TYPE.ORDERED_LIST_ITEM:
            return 'ol';
        default:
            return null;
    }
}

export class MarkupGenerator {
    // These are related to state.
    blocks: Array<ContentBlock>;
    contentState: ContentState;
    currentBlock: number;
    indentLevel: number;
    output: Array<string>;
    totalBlocks: number;
    wrapperTag?: string;
    // These are related to user-defined options.
    options: Options;
    inlineStyles: StyleMap;
    inlineStyleFn?: any;
    styleOrder: Array<string>;

    constructor(contentState: any, options?: any) {
        if (options == null) {
            options = {};
        }
        this.contentState = contentState;
        this.options = options;
        let [
            inlineStyles,
            styleOrder,
        ] = combineOrderedStyles(options.inlineStyles,  [
            DEFAULT_STYLE_MAP,
            DEFAULT_STYLE_ORDER,
        ]);
        this.inlineStyles = inlineStyles;
        this.inlineStyleFn = options.inlineStyleFn;
        this.styleOrder = styleOrder;
    }

    generate(): string {
        this.output = [];
        this.blocks = this.contentState.getBlocksAsArray();
        this.totalBlocks = this.blocks.length;
        this.currentBlock = 0;
        this.indentLevel = 0;
        this.wrapperTag = null;
        while (this.currentBlock < this.totalBlocks) {
            this.processBlock();
        }
        this.closeWrapperTag();
        return this.output.join('').trim();
    }

    processBlock() {
        let {blockRenderers, defaultBlockTag} = this.options;
        let block = this.blocks[this.currentBlock];
        let blockType = block.getType();
        let newWrapperTag = getWrapperTag(blockType);
        if (this.wrapperTag !== newWrapperTag) {
            if (this.wrapperTag) {
                this.closeWrapperTag();
            }
            if (newWrapperTag) {
                this.openWrapperTag(newWrapperTag);
            }
        }
        this.indent();
        // Allow blocks to be rendered using a custom renderer.
        let customRenderer =
            blockRenderers != null && blockRenderers.hasOwnProperty(blockType)
                ? blockRenderers[blockType]
                : null;
        let customRendererOutput = customRenderer ? customRenderer(block) : null;
        // Renderer can return null, which will cause processing to continue as normal.
        if (customRendererOutput != null) {
            this.output.push(customRendererOutput);
            this.output.push('\n');
            this.currentBlock += 1;
            return;
        }
        // let blockType = block.getType();

        if (blockType === 'atomic:image') {
            const src = block.getData().get('src');
            this.output.push(`<img width="100%" src="${src || undefined}"/>`)
        }
        this.writeStartTag(block, defaultBlockTag);
        this.output.push(this.renderBlockContent(block));
        // Look ahead and see if we will nest list.
        let nextBlock = this.getNextBlock();
        if (
            canHaveDepth(blockType) &&
            nextBlock &&
            nextBlock.getDepth() === block.getDepth() + 1
        ) {
            this.output.push('\n');
            // This is a litle hacky: temporarily stash our current wrapperTag and
            // render child list(s).
            let thisWrapperTag = this.wrapperTag;
            this.wrapperTag = null;
            this.indentLevel += 1;
            this.currentBlock += 1;
            this.processBlocksAtDepth(nextBlock.getDepth());
            this.wrapperTag = thisWrapperTag;
            this.indentLevel -= 1;
            this.indent();
        } else {
            this.currentBlock += 1;
        }
        this.writeEndTag(block, defaultBlockTag);
    }

    processBlocksAtDepth(depth: number) {
        let block = this.blocks[this.currentBlock];
        while (block && block.getDepth() === depth) {
            this.processBlock();
            block = this.blocks[this.currentBlock];
        }
        this.closeWrapperTag();
    }

    getNextBlock(): ContentBlock {
        return this.blocks[this.currentBlock + 1];
    }

    writeStartTag(block, defaultBlockTag) {
        let tags = getTags(block.getType(), defaultBlockTag);

        let attrString;
        if (this.options.blockStyleFn) {
            let {attributes, style} = this.options.blockStyleFn(block) || {} as any;
            // Normalize `className` -> `class`, etc.
            attributes = normalizeAttributes(attributes);
            if (style != null) {
                let styleAttr = styleToCSS(style);
                attributes =
                    attributes == null
                        ? {style: styleAttr}
                        : {...attributes, style: styleAttr};
            }
            attrString = stringifyAttrs(attributes);
        } else {
            attrString = '';
        }

        for (let tag of tags) {
            this.output.push(`<${tag}${attrString}>`);
        }
    }

    writeEndTag(block, defaultBlockTag) {
        let tags = getTags(block.getType(), defaultBlockTag);
        if (tags.length === 1) {
            this.output.push(`</${tags[0]}>\n`);
        } else {
            let output = [];
            for (let tag of tags) {
                output.unshift(`</${tag}>`);
            }
            this.output.push(output.join('') + '\n');
        }
    }

    openWrapperTag(wrapperTag: string) {
        this.wrapperTag = wrapperTag;
        this.indent();
        this.output.push(`<${wrapperTag}>\n`);
        this.indentLevel += 1;
    }

    closeWrapperTag() {
        let {wrapperTag} = this;
        if (wrapperTag) {
            this.indentLevel -= 1;
            this.indent();
            this.output.push(`</${wrapperTag}>\n`);
            this.wrapperTag = null;
        }
    }

    indent() {
        this.output.push(INDENT.repeat(this.indentLevel));
    }

    withCustomInlineStyles(content, styleSet) {
        if (!this.inlineStyleFn) {
            return content;
        }

        const renderConfig = this.inlineStyleFn(styleSet);
        if (!renderConfig) {
            return content;
        }

        const {element = 'span', attributes, style} = renderConfig;
        const attrString = stringifyAttrs({
            ...attributes,
            style: style && styleToCSS(style),
        });

        return `<${element}${attrString}>${content}</${element}>`;
    }

    renderBlockContent(block: ContentBlock): string {
        let blockType = block.getType();

        // if(blockType === 'atomic:image') {
        //     const src = block.getData().get('src');
        //     return `<img src="${src || undefined}"/>`
        // }
        let text = block.getText();
        if (text === '') {
            // Prevent element collapse if completely empty.
            return BREAK;
        }
        text = this.preserveWhitespace(text);
        let charMetaList: CharacterMetaList = block.getCharacterList();
        let entityPieces = getEntityRanges(text, charMetaList);
        return entityPieces
            .map(([entityKey, stylePieces]) => {
                let content = stylePieces
                    .map(([text, styleSet]) => {
                        let content = encodeContent(text);
                        for (let styleName of this.styleOrder) {
                            // If our block type is CODE then don't wrap inline code elements.
                            if (styleName === CODE && blockType === BLOCK_TYPE.CODE) {
                                continue;
                            }
                            if (styleSet.has(styleName)) {
                                let {element, attributes, style} = this.inlineStyles[styleName];
                                if (element == null) {
                                    element = 'span';
                                }
                                // Normalize `className` -> `class`, etc.
                                attributes = normalizeAttributes(attributes);
                                if (style != null) {
                                    let styleAttr = styleToCSS(style);
                                    attributes =
                                        attributes == null
                                            ? {style: styleAttr}
                                            : {...attributes, style: styleAttr};
                                }
                                let attrString = stringifyAttrs(attributes);
                                content = `<${element}${attrString}>${content}</${element}>`;
                            }
                        }

                        return this.withCustomInlineStyles(content, styleSet);
                    })
                    .join('');
                let entity = entityKey ? this.contentState.getEntity(entityKey) : null;
                // Note: The `toUpperCase` below is for compatability with some libraries that use lower-case for image blocks.
                let entityType = entity == null ? null : entity.getType().toUpperCase();
                console.log("stateToHTML", entityType, entityKey);
                let entityStyle;
                if (
                    entity != null &&
                    this.options.entityStyleFn &&
                    (entityStyle = this.options.entityStyleFn(entity))
                ) {
                    let {element, attributes, style} = entityStyle;
                    if (element == null) {
                        element = 'span';
                    }
                    // Normalize `className` -> `class`, etc.
                    attributes = normalizeAttributes(attributes);
                    if (style != null) {
                        let styleAttr = styleToCSS(style);
                        attributes =
                            attributes == null
                                ? {style: styleAttr}
                                : {...attributes, style: styleAttr};
                    }
                    let attrString = stringifyAttrs(attributes);
                    return `<${element}${attrString}>${content}</${element}>`;
                } else if (entityType != null && entityType === ENTITY_TYPE.LINK) {
                    let attrs = DATA_TO_ATTR.hasOwnProperty(entityType)
                        ? DATA_TO_ATTR[entityType](entityType, entity)
                        : null;
                    let attrString = stringifyAttrs(attrs);
                    return `<a${attrString}>${content}</a>`;
                } else if (entityType != null && entityType === ENTITY_TYPE.IMAGE) {
                    let attrs = DATA_TO_ATTR.hasOwnProperty(entityType)
                        ? DATA_TO_ATTR[entityType](entityType, entity)
                        : null;
                    let attrString = stringifyAttrs(attrs);
                    console.log("<{attrString}/>", `<img${attrString}/>`);
                    return `<img${attrString}/>`;
                } else {
                    return content;
                }
            })
            .join('');
    }

    preserveWhitespace(text: string): string {
        let length = text.length;
        // Prevent leading/trailing/consecutive whitespace collapse.
        let newText = new Array(length);
        for (let i = 0; i < length; i++) {
            if (
                text[i] === ' ' &&
                (i === 0 || i === length - 1 || text[i - 1] === ' ')
            ) {
                newText[i] = '\xA0';
            } else {
                newText[i] = text[i];
            }
        }
        return newText.join('');
    }
}

function stringifyAttrs(attrs?: Attributes) {
    if (attrs == null) {
        return '';
    }
    let parts = [];
    for (let name of Object.keys(attrs)) {
        let value = attrs[name];
        if (value != null) {
            parts.push(` ${name}="${encodeAttr(value + '')}"`);
        }
    }
    return parts.join('');
}

function canHaveDepth(blockType: string): boolean {
    switch (blockType) {
        case BLOCK_TYPE.UNORDERED_LIST_ITEM:
        case BLOCK_TYPE.ORDERED_LIST_ITEM:
            return true;
        default:
            return false;
    }
}

function encodeContent(text: string): string {
    return text
        .split('&')
        .join('&amp;')
        .split('<')
        .join('&lt;')
        .split('>')
        .join('&gt;')
        .split('\xA0')
        .join('&nbsp;')
        .split('\n')
        .join(BREAK + '\n');
}

function encodeAttr(text: string): string {
    return text
        .split('&')
        .join('&amp;')
        .split('<')
        .join('&lt;')
        .split('>')
        .join('&gt;')
        .split('"')
        .join('&quot;');
}

export default  function stateToHTML(
    content: ContentState,
    options?: Options,
) {
    // console.log("new MarkupGenerator(content, options).generate();",new MarkupGenerator(content, options).generate())
    return new MarkupGenerator(content, options).generate();
}


