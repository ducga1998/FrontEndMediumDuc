
export function filterStringHTML(str: any, flag: boolean = false , lengthString = 10): string {
    if (flag) {
        return str.replace(/<\/?[^>]+(>|$)/g, "")
    }
    if(!str) return ''
    const dot = lengthString > str.length ? '': '...'
    return str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, lengthString) + dot;
}
export function getVariableNam(variable) {
    return Object.keys({ variable })[0]
}

export function convertDataToGraphQL(API: any) {
    if (API && API['data']) {
        return API['data'][Object.keys(API['data'])[0]]
    }
    return []
}
export function dieEvent(event){
    event.preventDefault()
    event.stopPropagation()
}

export const LINK_DEVELOPMENT = process.env.NODE_ENV === 'production' ?'':'http://localhost:4000'