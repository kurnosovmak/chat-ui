import {defineStore} from 'pinia'

const AuthStoreName = 'auth'
const AuthLocalStorageName = 'token'

export const useAuthStore = defineStore(AuthStoreName, {
    state: () => {
        return {
            token: JSON.parse(localStorage.getItem(AuthLocalStorageName)),
        }
    },
    actions: {
        auth(token) {
            this.token = token
            localStorage.setItem(AuthLocalStorageName, JSON.stringify(token))
        },
        logout() {
            this.token = null
            localStorage.setItem(AuthLocalStorageName, JSON.stringify(this.token))
        },
    },
    getters: {
        isAuth: (state) => state.token !== null,
        getToken: (state) => state.token,
    }
})