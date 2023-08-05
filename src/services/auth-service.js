import {useAuthStore} from "../stores/auth.js";
import {useApiAuth} from "../repositories/auth/useApiAuth.js";


export class AuthService {

    static create() {
        const authStore = useAuthStore()
        const apiAuth = useApiAuth()
        return new AuthService(authStore, apiAuth)
    }
    constructor(authStore, apiAuth) {
        this.authStore = authStore
        this.apiAuth = apiAuth
    }

    async login(email, password) {
        const resp = await this.apiAuth.login(email, password)

        if (resp.isGood()) {
            this.authStore.auth(resp.data)
        }
        return resp
    }

    async logout() {
        this.authStore.logout()
        await this.apiAuth.logout()
        return true
    }

    isAuth() {
        return this.authStore.isAuth
    }
}