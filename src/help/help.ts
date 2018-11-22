export function filterStringHTML(str: any, flag: boolean = false): string {
    if (flag) {
        return str.replace(/<\/?[^>]+(>|$)/g, "")
    }
    return str.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 10);
}