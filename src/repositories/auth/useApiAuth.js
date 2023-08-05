import axios from "axios";
import {AuthRepository} from "./auth-repository.js";
import {useAuthStore} from "../../stores/auth.js";


export const useApiAuth = () => {
    const authStore = useAuthStore()
    let headers = []
    if(authStore.isAuth) {
        headers = {
            ...headers,
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