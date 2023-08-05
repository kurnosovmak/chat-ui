import {AuthService} from "../services/auth-service.js";

export default class AuthAdapter {
    static create() {
        return new AuthAdapter();
    }

    constructor() {
        this.authService = AuthService.create()
    }

    login(email, password) {
        return this.authService.login(email, password)
    }

    logout() {
        return this.authService.logout()
    }

    isAuth() {
        return this.authService.isAuth()
    }
}