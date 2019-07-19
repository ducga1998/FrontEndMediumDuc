import { createBrowserHistory } from 'history'
createBrowserHistory.prototype.push = () => { console.log('OKOKOKOK') }
export default createBrowserHistory({
    /* pass a configuration object here if needed */
})
