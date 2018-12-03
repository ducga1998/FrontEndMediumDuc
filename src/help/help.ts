// import  from 'socket.io-client'
export function filterStringHTML(str: any, flag: boolean = false): string {
    if (flag) {
        return str.replace(/<\/?[^>]+(>|$)/g, "")
    }
    return str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 10);
}
export function getVariableNam(variable) {
    Object.keys({ variable })[0]
}

export function convertDataToGraphQL(API: any) {
    if (API && API['data']) {
        // Object.assign()
        return API['data'][Object.keys(API['data'])[0]]

    }
}