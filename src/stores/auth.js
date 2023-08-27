import {defineStore} from 'pinia'

const AuthStoreName = 'auth'
const AuthLocalStorageName = 'token'

export const useAuthStore = defineStore(AuthStoreName, {
    state: () => {
        return {
            user: null,
            token: JSON.parse(localStorage.getItem(AuthLocalStorageName)),
        }
    },
    actions: {
        auth(token) {
            this.token = token
            localStorage.setItem(AuthLocalStorageName, JSON.stringify(token))
        },
        setUser(user) {
            this.user = user
        },
        logout() {
            this.token = null
            localStorage.setItem(AuthLocalStorageName, JSON.stringify(this.token))
        },
    },
    getters: {
        isAuth: (state) => state.token !== null,
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        getUserId: (state) => state.user ? state.user.id : null,
    }
})