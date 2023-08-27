import {defineStore} from 'pinia'

const MessageStoreName = 'message'

export const useMessangerStore = defineStore(MessageStoreName, {
    state: () => {
        return {
            messages:{},
        }
    },
    actions: {
        addMessages(chatId, messages) {
            if (!this.messages[chatId]) {
                this.messages[chatId] = {}
            }
            const sortedMessages = Object.keys(messages).sort(function(a,b){
                return  parseInt(b) -  parseInt(a);
            });

            sortedMessages.forEach((messageKey) => {
                this.messages[chatId][messageKey] = messages[messageKey]
            })
        },
        clearMessageByChatId(chatId) {
            this.messages[chatId] = {}
        },
        clear(){
            this.messages = {}
        },
    },
})