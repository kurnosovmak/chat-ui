import AuthAdapter from "../adapters/auth-adapter.js";
import {LOGIN_ROUTE} from "../router/router.js";

export default class AuthMiddleware {
    static create(router) {
        return new AuthMiddleware(router)
    }
    constructor(router) {
        this.authAdapter = AuthAdapter.create()
        this.router = router
    }

    check() {
        if(!this.authAdapter.isAuth()) {
            this.router.push(LOGIN_ROUTE)
            return false
        }
        return true
    }

    // этот метод нужнен чтобы что-то отрендерить при check === false если его не будет то станица продолжит грузться дальше
    // render() {
    //     return <div>123312</div>;
    // }
}