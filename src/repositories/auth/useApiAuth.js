import axios from "axios";
import {AuthRepository} from "./auth-repository.js";
import {useAuthStore} from "../../stores/auth.js";
import {ProfileRepository} from "./profile-repository.js";
import {useConversationsStore} from "../../stores/conversations.js";
import {MessagngerRepository} from "./messager-repository.js";
import AuthAdapter from "../../adapters/auth-adapter.js";


const BASE_URL = 'https://api.chat-up.online/api/v1';
export const BASE_URL_DOMAIN = 'http://test.loc:8080';
// export const BASE_URL = 'http://test.loc:8080/api/v1';
const getAxios = () => {
    const authStore = useAuthStore()
    let headers = {
        Accept: 'application/json',
    }
    if(authStore.isAuth) {
        headers = {
            ...headers,
            Authorization: 'Bearer ' +  authStore.token.accessToken,
        }
    }
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            ...headers
        },
    })

    client.interceptors.response.use(
        (response) => {
            return res;
        },
        async (error) => {
            if (error.response) {
                if (error.response.status === 401 && authStore.isAuth) {
                    // Do something, call refreshToken() request for example;

                    const authAdapter = AuthAdapter.create()
                    await authAdapter.refresh()
                    // return a request
                    return axios_instance(config);
                }

                if (error.response.status === ANOTHER_STATUS_CODE) {
                    // Do something
                    return Promise.reject(error.response.data);
                }
            }

            return Promise.reject(error);
        }
    )

    return client
}


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
            baseURL: BASE_URL,
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
            baseURL: BASE_URL,
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
            baseURL: BASE_URL,
            headers: {
                Accept: 'application/json',
                ...headers
            },
        })
    )
}