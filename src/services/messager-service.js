import {useApiMessage} from "../repositories/auth/useApiAuth.js";
import {useMessangerStore} from "../stores/messager.js";
import {useConversationsStore} from "../stores/conversations.js";


export class MessagerService {

    static create() {
        const messagerStore = useMessangerStore()
        const conversationsStore = useConversationsStore()
        const apiMessage = useApiMessage()
        return new MessagerService(messagerStore, conversationsStore, apiMessage)
    }
    constructor(messagerStore, conversationsStore, apiMessage) {
        this.messagerStore = messagerStore
        this.conversationsStore = conversationsStore
        this.apiMessage = apiMessage
    }

    async getHistory(chatId, messageId, per = 15) {
        const resp = await this.apiMessage.getHistory(chatId, messageId, per)

        if (resp.isGood()) {
            this.messagerStore.addMessages(chatId, resp.data.data)
            this.conversationsStore.addUsers(Object.values(resp.data.users))
            this.conversationsStore.addChats(Object.values(resp.data.chats))
        }
        return resp
    }

    async createChatWithUser(userId) {
        const resp = await this.apiMessage.createChatWithUser(userId)

        if (resp.isGood()) {
            this.conversationsStore.addUsers(Object.values(resp.data.users))
            this.conversationsStore.addChats(Object.values(resp.data.chats))
        }
        return resp
    }

    async getConversations(withConversations = false) {
        const resp = await this.apiMessage.getConversations(withConversations)

        if (resp.isGood()) {
            if (withConversations) {
                this.conversationsStore.addUsers(Object.values(resp.data.users))
                this.conversationsStore.addChats(Object.values(resp.data.chats))
            }
        }
        return resp
    }

    async sendMessage(chatId, message) {
        return await this.apiMessage.sendMessage(chatId, message)
    }
}