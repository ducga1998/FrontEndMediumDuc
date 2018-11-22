export function filterStringHTML(str: string, flag: boolean = false): string {
    const replacedStr = str.replace(/<\/?[^>]+(>|$)/g, "");
    return flag ? replacedStr : replacedStr.substring(0, 10);
}
