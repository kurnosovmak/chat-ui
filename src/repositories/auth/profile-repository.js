const ME_URL = '/profile/me'
const SEARCH_PROFILE_URL = '/profile/'
const GOOD_ME_STATUS = 200
const GOOD_SEARCH_PROFILE_STATUS = 200

export class ProfileRepository {
    #api;

    static create(api) {
        return new ProfileRepository(api);
    }

    constructor(api) {
        this.#api = api
    }

    async me() {
        let response
        try {
            response = await this.#api.get(ME_URL)
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_ME_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        const me = response.data.data
        return new Response(me, null)
    }

    async search(text) {
        let response
        try {
            response = await this.#api.get(SEARCH_PROFILE_URL + '?text=' + text)
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_SEARCH_PROFILE_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        return new Response(response.data.data, null)
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
