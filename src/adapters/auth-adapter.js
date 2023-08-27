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

    refresh(refreshToken) {
        return this.authService.refresh(refreshToken)
    }

    logout() {
        return this.authService.logout()
    }

    isAuth() {
        return this.authService.isAuth()
    }

    register({email, password, name, family, patronymic}) {
        return this.authService.register({email, password, name, family, patronymic})
    }

    registerCheck(id, key) {
        return this.authService.registerCheck(id, key)
    }
}