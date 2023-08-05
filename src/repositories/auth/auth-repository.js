const LOGIN_URL = '/auth/login'
const LOGOUT_URL = '/auth/logout'
const GOOD_LOGIN_STATUS = 200
const GOOD_LOGOUT_STATUS = 205

export class AuthRepository {
    #api;
    static create(api) {
        return new AuthRepository(api);
    }

    constructor(api) {
        this.#api = api
    }

    async login(email, password) {
        let response
        try {
            response = await this.#api.post(LOGIN_URL, {
                email: email,
                password: password,
            })
        }catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_LOGIN_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        const dataToken  = response.data.data
        return new Response(
            new Token(
                dataToken.accessToken,
                dataToken.refreshToken,
                dataToken.expiresIn,
                dataToken.tokenType,
                ), null)
    }

    async logout() {
        let response
        try {
            response = await this.#api.post(LOGOUT_URL)
        }catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_LOGOUT_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        return new Response(null, null)
    }

}

class Response {
    constructor(data, error) {
        this.data = data
        this.error = error
    }

    isError() {
        return this.error !== null
    }

    isGood() {
        return !this.isError()
    }

    getDataField(key, defaultValue = null) {
        return this.data[key] ?? defaultValue
    }

    getErrorStatusCode() {
        return this.error !== null ? (this.error?.statusCode ?? 'not set') : 'error empty'
    }

    getErrorMessage() {
        return this.error !== null ? (this.error?.message ?? 'not set') : 'error empty'
    }
}

export class Token {
    constructor(accessToken, refreshToken, expiresIn, tokenType) {
        this.accessToken    = accessToken
        this.refreshToken   = refreshToken
        this.expiresIn      = expiresIn
        this.tokenType      = tokenType
    }
}