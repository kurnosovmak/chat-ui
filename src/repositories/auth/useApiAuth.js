import axios from "axios";
import {AuthRepository} from "./auth-repository.js";
import {useAuthStore} from "../../stores/auth.js";
import {ProfileRepository} from "./profile-repository.js";
import {useConversationsStore} from "../../stores/conversations.js";
import {MessagngerRepository} from "./messager-repository.js";


// const

export const useApiAuth = () => {
    const authStore = useAuthStore()
    let headers = []
    if(authStore.isAuth) {
        headers = {
            ...headers,
            Accept: 'application/json',
            Authorization: 'Bearer ' +  authStore.token.accessToken,
        }
    }
    return AuthRepository.create(axios.create({
            baseURL: 'https://api.chat-up.online/api/v1',
            headers: {
                Accept: 'application/json',
                ...headers
            },
        })
    )
}
export const useApiProfile = () => {
    const authStore = useAuthStore()
    let headers = []
    if(authStore.isAuth) {
        headers = {
            ...headers,
            Accept: 'application/json',
            Authorization: 'Bearer ' +  authStore.token.accessToken,
        }
    }
    return ProfileRepository.create(axios.create({
            baseURL: 'https://api.chat-up.online/api/v1',
            headers: {
                Accept: 'application/json',
                ...headers
            },
        })
    )
}


export const useApiMessage = () => {
    const authStore = useAuthStore()
    let headers = []
    if(authStore.isAuth) {
        headers = {
            ...headers,
            Accept: 'application/json',
            Authorization: 'Bearer ' +  authStore.token.accessToken,
        }
    }
    return MessagngerRepository.create(axios.create({
            baseURL: 'https://api.chat-up.online/api/v1',
            headers: {
                Accept: 'application/json',
                ...headers
            },
        })
    )
}