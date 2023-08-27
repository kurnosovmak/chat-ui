import {defineStore} from 'pinia'

const ConversationsStoreName = 'conversations'

export const useConversationsStore = defineStore(ConversationsStoreName, {
    state: () => {
        return {
            users: {},
            chats: {},
            groups: [],
            channels: [],
        }
    },
    actions: {
        addUser(user) {
            this.addUsers([user])
        },
        addUsers(users) {
            users.forEach((user) => {
                this.users[user.id] = user
            });
        },
        clearUsers() {
            this.users = {}
        },
        addChat(chat) {
            this.addChats([chat])
        },
        addChats(chats) {
            chats.forEach((chat) => {
                this.chats[chat.id] = chat
            });
        },
        clearChats() {
            this.chats = {}
        },
    },
    getters: {
        // getUser: (state, userId) => state.users[userId] ?? null,
        // getChat: (state, chatId) => state.chats[chatId] ?? null,
    }
})