import {defineStore} from 'pinia'

const SelectedStoreName = 'selected'

export const useSelectedStore = defineStore(SelectedStoreName, {
    state: () => {
        return {
            selectedChat: null,
        }
    },
    actions: {

        setSelectedChat(chat) {
            this.selectedChat = chat;
        },
    },
    getters: {

    }
})