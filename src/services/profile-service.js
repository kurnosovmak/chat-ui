import {useConversationsStore} from "../stores/conversations.js";
import {useApiProfile} from "../repositories/auth/useApiAuth.js";
import {useAuthStore} from "../stores/auth.js";


export class ProfileService {

    static create() {
        const conversationsStore = useConversationsStore()
        const authStore = useAuthStore()
        const apiProfile = useApiProfile()
        return new ProfileService(conversationsStore, authStore, apiProfile)
    }
    constructor(conversationsStore, authSore, apiProfile) {
        this.conversationsStore = conversationsStore
        this.authSore = authSore
        this.apiProfile = apiProfile
    }

    async search(text) {
        const resp = await this.apiProfile.search(text)

        if (resp.isGood()) {
            this.conversationsStore.addUsers(resp.data)
        }
        return resp
    }

    async me() {
        const resp = await this.apiProfile.me()

        if (resp.isGood()) {
            this.authSore.setUser(resp.data)
            this.conversationsStore.addUser(resp.data)
        }
        return resp
    }
}