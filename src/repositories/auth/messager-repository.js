const GET_HISTORY_URL = '/messenger/messages/history'
const SEND_MESSAGE_URL = '/messenger/messages'
const GET_CONVERSATIONS_URL = '/messenger/chats'
const CREATE_CHAT_WITH_USER_URL = '/messenger/chats'
const GOOD_CREATE_CHAT_WITH_USER_STATUS = 200
const GOOD_GET_HISTORY_STATUS = 200
const GOOD_SEND_MESSAGE_STATUS = 200
const GOOD_GET_CONVERSATIONS_STATUS = 200

export class MessagngerRepository {
    #api;

    static create(api) {
        return new MessagngerRepository(api);
    }

    constructor(api) {
        this.#api = api
    }

    async getHistory(chatId, messageId, per = 15) {
        let response
        try {
            response = await this.#api.get(GET_HISTORY_URL, {
                params: {
                    message_id: messageId,
                    chat_id: chatId,
                    per: per,
                }
            })
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_GET_HISTORY_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        return new Response(response.data, null)
    }

    async createChatWithUser(userId) {
        let response
        try {
            response = await this.#api.post(CREATE_CHAT_WITH_USER_URL, {
                user_id: userId
            })
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_CREATE_CHAT_WITH_USER_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        return new Response(response.data, null)
    }

    async getConversations(withConversations = false) {
        let response
        try {
            response = await this.#api.get(GET_CONVERSATIONS_URL, {
                params: {
                    is_conversations: withConversations?1:0,
                }
            })
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_GET_CONVERSATIONS_STATUS) {
            return new Response(null, {...response.data, statusCode: response.status})
        }
        return new Response(response.data, null)
    }

    async sendMessage(chatId, message) {
        let response
        try {
            response = await this.#api.post(SEND_MESSAGE_URL, {
                chat_id: chatId,
                body: message,
            })
        } catch (error) {
            return new Response(null, {message: error.message, statusCode: 'status empty'})
        }

        if (response.status !== GOOD_SEND_MESSAGE_STATUS) {
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
