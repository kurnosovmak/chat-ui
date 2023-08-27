const LOGIN_URL = '/auth/login'
const REFRESH_URL = '/auth/refresh'
const LOGOUT_URL = '/auth/logout'
const REGISTER_URL = '/auth/register'
const REGISTER_CHECK_URL = '/auth/register/email-verify'
const GOOD_LOGIN_STATUS = 200
const GOOD_REGISTER_STATUS = 200
const GOOD_REGISTER_CHECK_STATUS = 204
const GOOD_LOGOUT_STATUS = 204

export class AuthRepository {
    #api;

    static create(api) {
        return new AuthRepository(api);
    }

    constructor(api) {
        this.#api = api
    }

    async refresh(refreshToken) {
        let response
        try {
            response = await this.#api.post(REFRESH_URL, {
                refresh_token: refreshToken,
            })
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_LOGIN_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        const dataToken = response.data.data
        return new Response(
            new Token(
                dataToken.accessToken,
                dataToken.refreshToken,
                dataToken.expiresIn,
                dataToken.tokenType,
            ), null)
    }

    async login(email, password) {
        let response
        try {
            response = await this.#api.post(LOGIN_URL, {
                email: email,
                password: password,
            })
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_LOGIN_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        const dataToken = response.data.data
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
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_LOGOUT_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        return new Response(null, null)
    }

    async register({email, password, name, family, patronymic}) {
        let response
        try {
            response = await this.#api.post(REGISTER_URL, {
                email: email,
                password: password,
                name: name,
                family: family,
                patronymic: patronymic,
            })
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_REGISTER_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        const id = response.data.data.id
        return new Response(id, null)
    }

    async registerCheck(id, key) {
        let response
        try {
            response = await this.#api.post(REGISTER_CHECK_URL + '/' + key + id)
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_REGISTER_CHECK_STATUS) {
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
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.expiresIn = expiresIn
        this.tokenType = tokenType
    }
}
