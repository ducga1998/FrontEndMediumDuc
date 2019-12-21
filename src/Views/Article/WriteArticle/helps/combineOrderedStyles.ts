import {RenderConfig} from "./type";

type StyleOrder = Array<string>;

type StyleMap = { [styleName: string]: RenderConfig };
type OrderedStyleMap = [StyleMap, StyleOrder];


export default function combineOrderedStyles(
    customMap?: any,
    defaults?: OrderedStyleMap,
): OrderedStyleMap {
    if (customMap == null) {
        return defaults;
    }
    let [defaultStyleMap, defaultStyleOrder] = defaults;
    let styleMap = {...defaultStyleMap};
    let styleOrder = [...defaultStyleOrder];
    for (let styleName of Object.keys(customMap)) {
        if (defaultStyleMap.hasOwnProperty(styleName)) {
            let defaultStyles = defaultStyleMap[styleName];
            styleMap[styleName] = {...defaultStyles, ...customMap[styleName]};
        } else {
            styleMap[styleName] = customMap[styleName];
            styleOrder.push(styleName);
        }
    }
    return [styleMap, styleOrder];
}
