// import  from 'socket.io-client'
export function filterStringHTML(str: any, flag: boolean = false , lengthString = 10): string {
    if (flag) {
        return str.replace(/<\/?[^>]+(>|$)/g, "")
    }
    const dot = lengthString > str.length ? '': '...'
    return str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, lengthString) + dot;
}
export function getVariableNam(variable) {
    Object.keys({ variable })[0]
}

export function convertDataToGraphQL(API: any) {
    if (API && API['data']) {
        // Object.assign()
        return API['data'][Object.keys(API['data'])[0]]
    }
    return {}
}