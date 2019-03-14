class Interation {
    dropTarget = null
    position = ''
    reset() {
       setTimeout(() => {
        this.dropTarget = null
        this.position = ''
       },100)

    }
}
export default new Interation()