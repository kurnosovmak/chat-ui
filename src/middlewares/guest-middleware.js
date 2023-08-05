import AuthAdapter from "../adapters/auth-adapter.js";
import {HOME_ROUTE} from "../router/router.js";

export default class GuestMiddleware {
    static create(router) {
        return new GuestMiddleware(router)
    }
    constructor(router) {
        this.authAdapter = AuthAdapter.create()
        this.router = router
    }

    async check() {
        console.log('GuestMiddleware: ', this.authAdapter.isAuth() ? 't' : 'f')
        if (this.authAdapter.isAuth()) {

            await this.router.push(HOME_ROUTE)
            return false
        }
        return true
    }

    // этот метод нужнен чтобы что-то отрендерить при check === false если его не будет то станица продолжит грузться дальше
    // render() {
    //     return <div>123312</div>;
    // }
}