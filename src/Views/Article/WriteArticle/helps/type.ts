import {ContentBlock, Entity} from "draft-js";
import {DraftInlineStyle} from "draft-js/lib/DraftInlineStyle";

export type AttrMap = { [key: string]: string };
export type Attributes = { [key: string]: string };
export type StyleDescr = { [key: string]: number | string };
export type RenderConfig = {
    element?: string;
    attributes?: Attributes;
    style?: StyleDescr;
};


export type BlockRenderer = (block: ContentBlock) => string;
export type BlockRendererMap = { [blockType: string]: BlockRenderer };


export type StyleMap = { [styleName: string]: RenderConfig };

export type BlockStyleFn = (block: ContentBlock) => RenderConfig;
export type EntityStyleFn = (entity: Entity) => RenderConfig;
type InlineStyleFn = (style: DraftInlineStyle) => RenderConfig;

export  type Options = {
    inlineStyles?: StyleMap;
    inlineStyleFn?: InlineStyleFn;
    blockRenderers?: BlockRendererMap;
    blockStyleFn?: BlockStyleFn;
    entityStyleFn?: EntityStyleFn;
    defaultBlockTag?: string;
};
