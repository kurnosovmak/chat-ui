import {MessagerService} from "../services/messager-service.js";


export default class MessangerAdapter {
    static create() {
        return new MessangerAdapter();
    }

    constructor() {
        this.messagerService = MessagerService.create()
    }

    sendMessage(chatId, message) {
        return this.messagerService.sendMessage(chatId, message)
    }

    createChatWithUser(userId) {
        return this.messagerService.createChatWithUser(userId)
    }

    getChats(withConversations = false) {
        return this.messagerService.getConversations(withConversations)
    }

    getHistory(chatId, messageIdStart, per = 15) {
        return this.messagerService.getHistory(chatId, messageIdStart, per)
    }

}